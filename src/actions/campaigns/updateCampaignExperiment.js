export default function updateCampaignExperiment(experiment, unsavedChanges = true) {
  return { type: 'UPDATE_CAMPAIGN_EXPERIMENT', payload: { experiment, unsavedChanges } }
}
