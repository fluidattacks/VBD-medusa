import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils"
import { HttpTypes } from "@medusajs/framework/types"
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (
  req: MedusaRequest<HttpTypes.StoreRegionFilters>,
  res: MedusaResponse<HttpTypes.StoreRegionListResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "region",
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })

  const { rows: regions, metadata } = await remoteQuery(queryObject)

  const { rows: recentOrders } = await remoteQuery(
    remoteQueryObjectFromString({
      entryPoint: "order",
      variables: {
        filters: { region_id: regions.map((region) => region.id) },
        take: 50,
        order: { created_at: "DESC" },
      },
      fields: [
        "id",
        "region_id",
        "email",
        "total",
        "shipping_address.first_name",
        "shipping_address.last_name",
        "shipping_address.address_1",
        "shipping_address.city",
        "shipping_address.phone",
      ],
    })
  )

  res.json({
    regions: regions.map((region) => ({
      ...region,
      recent_orders: recentOrders.filter(
        (order) => order.region_id === region.id
      ),
    })),
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
