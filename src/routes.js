/* eslint-disable react/display-name */
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
import App from './App'
import ModuleIndex from './components/ModuleIndex'
import SchedulesModuleContainer from './components/SchedulesModuleContainer'
import PartnerCalendarsContainer from './components/Partners/PartnerCalendarsContainer'
import LocationScheduleModal from './components/LocationSchedule/LocationScheduleModal'
import CreateScheduleModal from './components/CreateSchedule/CreateScheduleModal'
import UpdateScheduleModal from './components/CreateSchedule/UpdateScheduleModal'
import EditShiftTimeModal from './components/Calendars/EditShiftTimeModal'
import AssignAgentsModal from './components/Partners/AssignAgentsModal'
import PartnersContainer from './components/Partners/PartnersContainer'
import HoursContainer from './components/Hours/HoursContainer'
import PlansContainer from './components/Acquisition/Plans/PlansContainer'
import PlanContainer from './components/Acquisition/Plans/PlanContainer'
import CampaignsContainer from './components/Acquisition/Campaigns/CampaignsContainer'
import CampaignContainer from './components/Acquisition/Campaigns/CampaignContainer'
import CampaignsContext from './components/Acquisition/CampaignsContext'
import ExperimentsContainer from './components/Audience/Experiments/ExperimentsContainer'
import ExperimentContainer from './components/Audience/Experiments/ExperimentContainer'
import CreateExperimentModal from './components/Audience/Experiments/CreateExperimentModal'
import SegmentsContainer from './components/Audience/Segments/SegmentsContainer'
import EditSegmentContainer from './components/Audience/Segments/EditSegmentContainer'
import StaticMarketRatesContainer from './components/Acquisition/StaticMarketRates/StaticMarketRatesContainer'
import EditLoyalty from './components/Acquisition/Rewards/EditLoyalty'
import EditPromo from './components/Acquisition/Rewards/EditPromo'
import RewardsContainer from './components/Acquisition/Rewards/RewardsContainer'
import CreateStaticMarketRateModal from './components/Acquisition/StaticMarketRates/CreateStaticMarketRateModal'
import MarginAdjustmentsContainer from './components/Acquisition/MarginAdjustments/MarginAdjustmentsContainer'
import MarginAdjustmentContainer from './components/Acquisition/MarginAdjustments/MarginAdjustmentContainer'
import TerritoryContainer from './components/Territory/TerritoryContainer'
import CompensationContainer from './components/Compensation/CompensationContainer'
import CompBonusesContainer from './components/Compensation/Bonuses/CompBonusesContainer'
import CompBonus from './components/Compensation/Bonuses/CompBonus'
import CompBonusCreate from './components/Compensation/Bonuses/CompBonusCreate'
import CompRunContainer from './components/Compensation/CompRunContainer'
import CompRunsContainer from './components/Compensation/CompRunsContainer'
import CompRulesContainer from './components/Compensation/CompRulesContainer'
import CompRunScheduleContainer from './components/Compensation/CompRunScheduleContainer'
import EditCompRunScheduleContainer from './components/Compensation/EditCompRunScheduleContainer'
import CreateCompRunSchedule from './components/Compensation/CreateCompRunSchedule'
import PartnerScheduleHistoryContainer from './components/Partners/PartnerScheduleHistoryContainer'
import PartnerRedirect from './components/Partners/PartnerRedirect'
import SalesAgentCalendar from './components/SalesAgents/SalesAgentCalendar'
import InstallationTerritories from './components/SupplyChain/InstallationTerritories'
import InstallationInstallerAdd from './components/SupplyChain/InstallationInstallerAdd'
import InstallationTerritoryAdd from './components/SupplyChain/InstallationTerritoryAdd'
import Dispositions from './components/MX/Dispositions/Dispositions'
import CorrespondenceTemplates from './components/Correspondence/CorrespondenceTemplates'
import CorrespondenceTemplateContainer from './components/Correspondence/CorrespondenceTemplateContainer'
import CorrespondenceTemplateHistory from './components/Correspondence/CorrespondenceTemplateHistory'
import AgentContainer from './components/Agents'
import EventContainer from './components/Events'
import CreateSalesEvent from './components/Events/CreateSalesEvent'
import LocationContainer from './components/Locations'
import CasesContainer from './components/Cases'
import CreateLocation from './components/Locations/CreateLocation'
import OfficeContainer from './components/Offices'
import PermissionsContainer from './components/Permissions'
import SourcesContainer from './components/Sources'
import UpdateSource from './components/Sources/UpdateSource'
import UpdatePermission from './components/Permissions/UpdatePermission'
import ChannelPartnersContainer from './components/ChannelPartners'
import UpdateChannelPartner from './components/ChannelPartners/UpdateChannelPartner'
import DashboardContainer from './components/Dashboard'
import Callback from './components/Callback'
import UsersContainer from './components/Users'
import UpdateUser from './components/Users/UpdateUser'
import Auth from './Auth'
import store from './store'
import history from './history'
import { Provider } from 'react-redux'
import {
  EXPERIMENTS,
  SEGMENTS,
  CAMPAIGNS,
  CAMPAIGNS_CONTEXT,
  STATIC_MARKET_RATES,
  MARGIN_ADJUSTMENTS,
  PLANS,
  INSTALLATION_TERRITORIES,
  REWARDS,
} from './utils/roles'

const auth = new Auth()

export const sideBarRoutes = [
  {
    label: 'Sales',
    routes: [
      {
        name: 'Agents',
        path: '/agents',
        icon: 'street-view',
        roles: ['Admin', 'SalesManager'],
        exact: true,
        render: (props) => <AgentContainer {...props} />,
      },
      {
        name: 'Cases',
        path: '/cases',
        icon: 'tools',
        roles: ['Admin', 'SalesManager'],
        exact: true,
        render: (props) => <CasesContainer {...props} />,
      },
      {
        name: 'Channel Partners',
        path: '/channelpartners',
        icon: 'store',
        roles: ['Admin', 'SalesManager'],
        exact: true,
        render: (props) => <ChannelPartnersContainer {...props} />,
      },
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'address-card',
        roles: ['Admin', 'SalesManager', 'SalesPartnerExec'],
        exact: true,
        render: (props) => <DashboardContainer {...props} />,
      },
      {
        name: 'Events',
        path: '/events',
        icon: 'calendar',
        roles: ['Admin', 'SalesManager'],
        exact: true,
        render: (props) => <EventContainer {...props} />,
      },
      {
        name: 'Hours',
        path: '/hours',
        icon: 'clock',
        roles: ['Admin', 'SalesManager', 'SalesPartnerExec'],
        exact: true,
        render: (props) => <HoursContainer {...props} />,
      },
      {
        name: 'Locations',
        path: '/locations',
        icon: 'map-marker',
        roles: ['Admin', 'SalesManager'],
        exact: true,
        render: (props) => <LocationContainer {...props} />,
      },
      {
        name: 'Offices',
        path: '/offices',
        icon: 'building',
        roles: ['Admin', 'SalesManager'],
        exact: true,
        render: (props) => <OfficeContainer {...props} />,
      },
      {
        name: 'Permissions',
        path: '/permissions',
        icon: 'key',
        roles: ['Admin', 'SalesManager'],
        exact: true,
        render: (props) => <PermissionsContainer {...props} />,
      },
      {
        name: 'Retail & Event Partners',
        path: '/partners',
        icon: 'handshake',
        roles: ['Admin', 'SalesManager'],
        exact: true,
        render: (props) => <PartnersContainer {...props} />,
      },
      {
        name: 'Schedules',
        path: '/schedules/channels/retail',
        icon: 'user-clock',
        roles: ['Admin', 'SalesManager'],
        exact: true,
      },
      {
        name: 'Sources',
        path: '/sources',
        icon: 'sitemap',
        roles: ['Admin', 'SalesManager'],
        exact: true,
        render: (props) => <SourcesContainer {...props} />,
      },
      {
        name: 'Territory',
        path: '/territory',
        icon: 'globe',
        roles: ['Admin', 'SalesManager'],
        exact: true,
        render: (props) => <TerritoryContainer {...props} />,
      }, 
        
      {
        name: 'Users',
        path: '/users',
        icon: 'users',
        roles: ['Admin'],
        exact: true,
        render: (props) => <UsersContainer {...props} />,
      },
        
    ],
  },
  {
    label: 'Campaigns',
    routes: [
      {
        name: 'Experiments',
        path: '/experiments',
        icon: 'flask',
        roles: EXPERIMENTS.READ,
        exact: true,
        render: (props) => <ExperimentsContainer {...props} />,
      },
      {
        name: 'Segments',
        path: '/segments/active',
        icon: 'chart-pie',
        roles: SEGMENTS.READ,
        render: (props) => <SegmentsContainer {...props} tab="active" />,
      },
      {
        name: 'Plans',
        path: '/plans',
        icon: 'clipboard-list',
        roles: PLANS.READ,
        exact: true,
        render: (props) => <PlansContainer {...props} />,
      },
      {
        name: 'Campaigns',
        path: '/campaigns',
        icon: 'bullhorn',
        roles: CAMPAIGNS.READ,
        exact: true,
        render: (props) => <CampaignsContainer {...props} />,
      },
      {
        name: 'Campaigns Context',
        path: '/campaigns_context',
        icon: 'user-astronaut',
        roles: CAMPAIGNS_CONTEXT.READ,
        exact: true,
        render: (props) => <CampaignsContext {...props} />,
      },
      {
        name: 'Static Market Rates',
        path: '/static_market_rates',
        icon: 'money-bill',
        roles: STATIC_MARKET_RATES.READ,
        render: (props) => <StaticMarketRatesContainer {...props} />,
      },
      {
        name: 'Margin Adjustments',
        path: '/margin_adjustments',
        icon: 'sliders-h',
        roles: MARGIN_ADJUSTMENTS.READ,
        exact: true,
        render: (props) => <MarginAdjustmentsContainer {...props} />,
      },
      {
        name: 'Rewards',
        path: '/rewards',
        icon: 'hand-holding-usd',
        exact: true,
        roles: REWARDS.READ,
        render: (props) => <RewardsContainer {...props} />,
      },
    ],
  },
  {
    label: 'Compensation',
    routes: [
      {
        name: 'Compensation',
        path: '/compensation',
        icon: 'dollar-sign',
        roles: ['Admin', 'SalesManager'],
        exact: true,
        render: (props) => <CompensationContainer {...props} />,
      },
      {
        name: 'Bonuses',
        path: '/compensation/bonuses',
        icon: 'coins',
        roles: ['Admin', 'SalesManager'],
        exact: true,
        render: (props) => <CompBonusesContainer {...props} />,
      },
    ],
  },
  {
    label: 'Supply Chain',
    routes: [
      {
        name: 'Installation Territories',
        path: '/installation_territories',
        icon: 'tools',
        roles: INSTALLATION_TERRITORIES.READ,
        exact: true,
        render: (props) => <InstallationTerritories {...props} />,
      },
    ],
  },
  {
    label: 'MX',
    routes: [
      {
        name: 'Dispositions',
        path: '/dispositions',
        icon: 'flag',
        roles: ['Admin', 'CustomerService', 'CustomerServiceManager', 'Operations'],
        exact: true,
        render: (props) => <Dispositions {...props} />,
      },
    ],
  },
  {
    label: 'Correspondence',
    routes: [
      {
        name: 'Templates',
        path: '/correspondence_templates',
        icon: 'file',
        roles: ['Admin', 'Marketing', 'Regulatory', 'Operations'],
        exact: true,
        render: (props) => <CorrespondenceTemplates {...props} />,
      },
    ],
  },
]

const renderRoute = (route, index) => (
  <Route
    key={`route-${index}`}
    exact={route.exact}
    path={route.path}
    render={route.render}
  />
)

export const makeMainRoutes = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <ErrorBoundary>
          <App auth={auth}>
            <Route
              component={ModuleIndex}
              exact={true}
              path="/"
            />
            {sideBarRoutes.map(label => (
              label.routes.map((route, index) => renderRoute(route, index))
            ))}
            <Route
              component={SchedulesModuleContainer}
              path="/schedules/channels/:channelCode"
            />
            <Route
              path="/schedules/channels/:channelCode/locations/:locationCode/view"
              render={(props) => <LocationScheduleModal {...props} visible={true} />}
            />
            <Route
              path="/schedules/channels/:channelCode/locations/:locationCode/shifts/:shiftId/edit"
              render={(props) => <EditShiftTimeModal {...props} visible={true} />}
            />
            <Route
              path="/schedules/channels/:channelCode/create"
              render={(props) => <CreateScheduleModal {...props} visible={true} />}
            />
            <Route
              path="/schedules/channels/:channelCode/locations/:locationCode/edit"
              render={(props) => <UpdateScheduleModal {...props} visible={true} />}
            />
            <Route
              component={PartnerRedirect}
              path="/partner"
            />
            <Route
              component={PartnerCalendarsContainer}
              path="/partners/:sourceCode/schedules"
            />
            <Route
              exact
              component={PartnerScheduleHistoryContainer}
              path="/partners/:sourceCode/schedule_history"
            />
            <Route
              component={AssignAgentsModal}
              path="/partners/:sourceCode/schedules/locations/:locationCode/shift/:shiftId"
            />
            <Route
              path="/partners/:sourceCode/schedules/locations/:locationCode/shifts/:shiftId/edit"
              render={(props) => <EditShiftTimeModal {...props} visible={true} />}
            />
            <Route
              component={SalesAgentCalendar}
              path="/sales_agents/:salesAgentId/schedule"
            />
            <Route
              component={HoursContainer}
              path="/hours/:sourceCode"
            />

            <Route
              component={PlanContainer}
              path="/plans/:planCode"
            />

            <Route
              component={CampaignContainer}
              path="/campaigns/:campaignId"
            />
            <Route
              component={CreateExperimentModal}
              path="/campaigns/:campaignId/experiment/:experimentId"
            />
            <Route
              component={CreateExperimentModal}
              path="/experiments/new"
            />
            <Route
              exact
              component={ExperimentContainer}
              path="/experiments/:experimentId"
            />
            <Route
              exact
              path="/segments/context"
              render={(props) => <SegmentsContainer {...props} tab="context" />}
            />
            <Route
              exact
              path="/segments/inactive"
              render={(props) => <SegmentsContainer {...props} tab="inactive" />}
            />
            <Route
              exact
              component={EditSegmentContainer}
              path="/segments/active/:segmentId/edit"
            />

            <Route
              exact
              component={CreateStaticMarketRateModal}
              path="/static_market_rates/new"
            />

            <Route
              component={MarginAdjustmentContainer}
              path="/margin_adjustments/:marginAdjustmentId"
            />
            <Route
              exact
              component={CompRunsContainer}
              path="/compensation/schedules/:compRunScheduleCode/runs"
            />
            <Route
              exact
              component={CompRunContainer}
              path="/compensation/schedules/:compRunScheduleCode/runs/:compRunId"
            />
            <Route
              component={CompRulesContainer}
              path="/compensation/schedules/:compRunScheduleCode/rules"
            />

            <Route
              component={EditCompRunScheduleContainer}
              path="/compensation/schedules/:compRunScheduleCode/edit"
            />
            <Route
              exact
              strict
              component={CreateCompRunSchedule}
              path="/compensation/schedules/new"
            />
            <Route
              exact
              strict
              component={CompRunScheduleContainer}
              path="/compensation/schedules/:compRunScheduleCode"
            />
            <Switch>
              <Route
                exact
                strict
                component={EditLoyalty}
                path="/rewards/editLoyaltyProgram/:loyaltyProgramCode"
              />
              <Route
                exact
                strict
                component={EditPromo}
                path="/rewards/editPromo/:promoCode"
              />
            </Switch>
            <Switch>
              <Route
                exact
                strict
                component={CompBonusCreate}
                path="/compensation/bonuses/create"
              />
              <Route
                exact
                strict
                component={CompBonus}
                path="/compensation/bonuses/:compRunScheduleBonusRuleId"
              />
            </Switch>
            <Route
              exact
              strict
              component={InstallationInstallerAdd}
              path="/installation_territories/:installationTerritoryId/installers/add"
            />
            <Route
              exact
              strict
              component={InstallationTerritoryAdd}
              path="/installation_territories/add"
            />
            <Route
              exact
              strict
              component={CreateSalesEvent}
              path="/events/create"
            />
            <Route
              exact
              strict
              component={CreateLocation}
              path="/locations/create"
            />
            <Route
              exact
              strict
              component={UpdateSource}
              path="/sources/update"
            />
            <Route
              exact
              strict
              component={UpdatePermission}
              path="/permissions/update"
            />
            <Route
              exact
              strict
              component={CorrespondenceTemplateContainer}
              path="/correspondence_templates/:correspondenceTemplateId"
            />
            <Route
              exact
              strict
              component={CorrespondenceTemplateHistory}
              path="/correspondence_templates/:correspondenceTemplateId/history/:correspondenceTemplateHistoryId"
            />
            <Route
              exact
              strict
              component={CasesContainer}
              path="/cases/:case_guid"
            />
            <Route 
              exact
              strict
              component={UpdateUser}
              path="/users/update"
            />
            <Route
              exact
              strict
              component={UpdateChannelPartner}
              path="/channelpartners/update"
            />
          </App>
          <Route
            exact
            path="/callback"
            render={(props) => <Callback auth={auth} {...props} />}
          />
        </ErrorBoundary>
      </Router>
    </Provider>
  )
}
