/*
 * Copyright 2015-2016 Imply Data, Inc.
 * Copyright 2017-2018 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { Clicker } from "../../../common/models/clicker/clicker";
import { Essence } from "../../../common/models/essence/essence";
import { Stage } from "../../../common/models/stage/stage";
import { Fn } from "../../../common/utils/general/general";
import { clamp } from "../../utils/dom/dom";
import { DimensionListTile } from "../dimension-list-tile/dimension-list-tile";
import { MeasuresTile } from "../measures-tile/measures-tile";
import "./dimension-measure-panel.scss";

const TOTAL_FLEXES = 100;
const MIN_FLEX = 20;
const MIN_HEIGHT = 150;

export interface DimensionMeasurePanelProps {
  clicker: Clicker;
  essence: Essence;
  menuStage: Stage;
  triggerFilterMenu: Fn;
  triggerSplitMenu: Fn;
  style?: React.CSSProperties;
}

export interface DimensionMeasurePanelState {
}

export class DimensionMeasurePanel extends React.Component<DimensionMeasurePanelProps, DimensionMeasurePanelState> {

  render() {
    const { clicker, essence, menuStage, triggerFilterMenu, triggerSplitMenu, style } = this.props;
    const { dataCube } = essence;

    // Compute relative sizes by diving up TOTAL_FLEXES
    var numDimensions = dataCube.dimensions.size();
    var numMeasures = dataCube.measures.size();

    var dimensionsFlex = clamp(
      Math.ceil(TOTAL_FLEXES * numDimensions / (numDimensions + numMeasures)),
      MIN_FLEX,
      TOTAL_FLEXES - MIN_FLEX
    );
    var measuresFlex = TOTAL_FLEXES - dimensionsFlex;

    var dimensionListStyle: any = { flex: dimensionsFlex };
    if (dimensionsFlex === MIN_FLEX) dimensionListStyle.minHeight = MIN_HEIGHT;

    var measuresStyle: any = { flex: measuresFlex };
    if (measuresFlex === MIN_FLEX) measuresStyle.minHeight = MIN_HEIGHT;

    return <div className="dimension-measure-panel" style={style}>
      <DimensionListTile
        clicker={clicker}
        essence={essence}
        menuStage={menuStage}
        triggerFilterMenu={triggerFilterMenu}
        triggerSplitMenu={triggerSplitMenu}
        style={dimensionListStyle}
      />
      <MeasuresTile
        clicker={clicker}
        essence={essence}
        style={measuresStyle}
      />
    </div>;
  }
}
