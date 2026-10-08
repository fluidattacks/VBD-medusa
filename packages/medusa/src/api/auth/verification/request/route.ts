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

  // Allow the caller to attach the verification to an explicit identity (e.g.
  // admin-initiated verification on behalf of a user) via metadata, falling
  // back to the authenticated session when it isn't provided.
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
