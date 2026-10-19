import { requestVerificationWorkflow } from "@medusajs/core-flows"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VerificationRequestType } from "../../validators"

/**
 * @since 2.16.0
 */
export const POST = async (
  req: AuthenticatedMedusaRequest<VerificationRequestType>,
  res: MedusaResponse
) => {
  const { entity_id, entity_type, code_provider, metadata } = req.validatedBody

  const authIdentityId =
    (metadata?.auth_identity_id as string | undefined) ??
    req.auth_context.auth_identity_id

  const { result } = await requestVerificationWorkflow(req.scope).run({
    input: {
      auth_identity_id: authIdentityId,
      entity_id,
      entity_type,
      code_provider,
      metadata,
    },
  })

  res.status(201).json({ verification: result })
}
