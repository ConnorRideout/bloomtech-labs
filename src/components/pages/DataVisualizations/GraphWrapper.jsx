import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
// import test_data from '../../../data/test_data.json';  comment out unused test data import
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }
  function updateStateWithNewData(years, view, office, stateSettingCallback) {
    const apiUrl = 'https://hrf-asylum-be-b.herokuapp.com/cases';

    /*
          _                                                                             _
        |                                                                                 |
        |   Example request for once the `/summary` endpoint is up and running:           |
        |                                                                                 |
        |     `${url}/summary?to=2022&from=2015&office=ZLA`                               |
        |                                                                                 |
        |     so in axios we will say:                                                    |
        |                                                                                 |     
        |       axios.get(`${url}/summary`, {                                             |
        |         params: {                                                               |
        |           from: <year_start>,                                                   |
        |           to: <year_end>,                                                       |
        |           office: <office>,       [ <-- this one is optional! when    ]         |
        |         },                        [ querying by `all offices` there's ]         |
        |       })                          [ no `office` param in the query    ]         |
        |                                                                                 |
          _                                                                             _
                                   -- Mack 
    
    */

    if (office === 'all' || !office) {
      axios
        .get(`${apiUrl}/fiscalSummary`, {
          //added correct url for fical summary
          // mock URL, can be simply replaced by `${Real_Production_URL}/summary` in prod!
          params: {
            from: years[0],
            to: years[1],
          },
        })
        .then(result => {
          stateSettingCallback(view, office, result.data); // <-- `test_data` here can be simply replaced by `result.data` in prod!
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      axios
        .get(`${apiUrl}/citizenshipSummary`, {
          // added correct url for citizenship summery
          // mock URL, can be simply replaced by `${Real_Production_URL}/summary` in prod!
          params: {
            from: years[0],
            to: years[1],
            office: office,
          },
        })
        .then(result => {
          stateSettingCallback(view, office, result.data); // <-- `test_data` here can be simply replaced by `result.data` in prod!
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
  /*
  const fiscalRequest = axios.get(`${apiUrl}/fiscalSummary`, {
    params: {
      from: years[0],
      to: years[1],
    },
  });

  const citizenshipRequest = axios.get(`${apiUrl}/citizenshipSummary`, {
    params: {
      from: years[0],
      to: years[1],
      office: office,
    },
  });

  axios.all([fiscalRequest, citizenshipRequest])
    .then(axios.spread((fiscalResult, citizenshipResult) => {
      const fiscalData = fiscalResult.data;
      const citizenshipData = citizenshipResult.data;

      const combinedData = combineData(fiscalData, citizenshipData);

      stateSettingCallback(view, office, combinedData);
    }))
    .catch(err => {
      console.error(err);
    });
}

const combineData = (fiscalData, citizenshipData) => {
  const combinedData = [];

  fiscalData.forEach(fiscalItem => {
    const citizenshipItem = citizenshipData.find(item => item.fiscal_year === fiscalItem.fiscal_year);

    if (citizenshipItem) {
      const combinedItem = {
        fiscal_year: fiscalItem.fiscal_year,
        fiscal_granted: fiscalItem.granted,
        fiscal_denied: fiscalItem.denied,
        citizenship_granted: citizenshipItem.granted,
        citizenship_denied: citizenshipItem.denied,
        // Add more properties as needed
      };

      combinedData.push(combinedItem);
    }
  });

  return combinedData;
};
*/

  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };
  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
