/*
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
import { Unary } from "../../../common/utils/functional/functional";
import { isTruthy } from "../../../common/utils/general/general";
import { Delta } from "../../components/delta/delta";
import "./total.scss";

interface PreviousProps {
  currentValue: number;
  previousValue: number;
  formatter: Unary<number, string>;
}

const Previous: React.SFC<PreviousProps> = ({ currentValue, previousValue, formatter }) => {
  return <React.Fragment>
    <div className="measure-value measure-value--previous">
      {formatter(previousValue)}
    </div>
    <div className="measure-delta-value">
      <Delta previousValue={previousValue} currentValue={currentValue} formatter={formatter}/>
    </div>
  </React.Fragment>;
};

export interface TotalProps {
  key: string | number;
  name: string;
  value?: number;
  previous?: number;
  formatter: Unary<number, string>;
}

export const Total: React.SFC<TotalProps> = ({ key, name, value, previous, formatter }) => {
  return <div className="total" key={key}>
    <div className="measure-name" title={name}>{name}</div>
    <div className="measure-value">{value ? formatter(value) : "-"}</div>
    {isTruthy(previous) && <Previous currentValue={value} previousValue={previous} formatter={formatter}/>}
  </div>;
};
