export default (staticMarketRate) => {
  return `${staticMarketRate.market_code}_${staticMarketRate.revenue_class_code}_${staticMarketRate.plan_code}`
}
