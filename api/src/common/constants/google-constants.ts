import 'dotenv/config'

export const googleConstants = {
  auth: {
    apiKey: process.env.GCP_API_KEY!,
    identityToolkitUrl: process.env.GCP_IDENTITY_TOOLKIT_URL!,
    secureTokenUrl: process.env.GCP_SECURE_TOKEN_URL!,
    tenantPatientId: process.env.GCP_PATIENT_TENANT_ID!,
    tenantMedicID: process.env.GCP_MEDIC_TENANT_ID!,
  },
  storage: {
    bucket: process.env.GCP_STORAGE_BUCKET_NAME!,
    credentials: process.env.GCP_CREDENTIAL_BUCKET,
    folder: process.env.GCP_STORAGE_FOLDER_INTO_BUCKET!,
  },
}
