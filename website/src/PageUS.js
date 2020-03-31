import React from 'react';
import { withRouter } from 'react-router-dom'
import * as USCounty from "./USCountyInfo.js";
import { BasicGraphNewCases } from "./GraphNewCases.js"
import { GraphUSTesting } from "./GraphTestingEffort"
import { withHeader } from "./Header.js"
import { MyTabs } from "./MyTabs.js"
import * as Util from "./Util.js"
import { USInfoTopWidget } from './USInfoTopWidget.js'
import { GraphUSHospitalization } from './GraphHospitalization.js'
import { AllStatesListWidget } from "./CountyListRender.js"

import { logger } from "./AppModule"

const GraphSectionUS = withRouter((props) => {
    let graphdata = USCounty.getUSDataForGrapth();
    const tabs = [
        <BasicGraphNewCases data={graphdata} logScale={false} />,
        <GraphUSTesting />,
        <GraphUSHospitalization />,
    ]
    let graphlistSection = <MyTabs
        labels={["Cases", `USA Testing`, "Hospitalization"]}
        tabs={tabs}
    />;
    return graphlistSection;
});

const PageUS = withHeader((props) => {
    const default_county_info = Util.getDefaultCounty();
    logger.logEvent("PageUS");

    const tabs = [
        <AllStatesListWidget
            callback={(newstate) => {
                Util.browseToState(props.history, newstate);
            }}
        ></AllStatesListWidget>,
    ];
    return (
        <>
            <USInfoTopWidget
                county={default_county_info.county}
                state={default_county_info.state}
                selectedTab={"usa"}
                callback={(newcounty, newstate) => {
                    Util.browseTo(props.history, newstate, newcounty);
                }}
            />
            <GraphSectionUS
                callback={(newcounty, newstate) => {
                    Util.browseTo(props.history, newstate, newcounty);
                }}
            />
            <MyTabs
                labels={["States of USA"]}
                tabs={tabs}
            />
        </>
    );
});

export { PageUS }