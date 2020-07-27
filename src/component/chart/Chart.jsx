import './chart.css';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { parse } from '../../util/jsonUtil';
import { format } from 'date-fns'
import TopBar from "../TopBar";
import EditorCode from "../editor/EditorCode";
import { getRandomColor, toTitle } from '../../util/util';

export default () => {
    const [state, setState] = useState({
        labels: [],
        datasets:[]
    })

    const [jsonValue, setJsonValue] = useState();

    const getIndexByType = (events, type) => {
        return events.findIndex((element) => element.type === type);
    }


    const filterDataEvents = (events) => {

        return events.slice(getIndexByType(events, 'start') + 1, getIndexByType(events, 'stop')).filter(element => element.type !== 'span');
    }

    const orderedByBrowserAndOs = (a, b) => {
        let _a = "".concat(a.browser, a.os);
        let _b = "".concat(b.browser, b.os);
        return _a > _b;
    }



    const factoryData = (title, plotValue) => {
        let color = getRandomColor();
        return {
            label : title,
            data: [plotValue],
            backgroundColor: color,
            borderColor: color,
            showLine: true,
            fill: false,
            lineTension: 0.5,
            borderWidth: 2,
            pointStyle: 'circle',
            pointRadius: 5};
    }

    const validadeEvent = (index, name) =>  {
        if (index === -1) {
            throw new Error('Event ' + name + ' is required!');
        }
    }

    const validadeEventsData = (filtereds) =>  {
        if (!filtereds || filtereds.length === 0) {
            throw new Error('Events data are required!');
        }
    }

    const onClick = () => {
        try {
            let allEvents = parse(jsonValue);

            let indexEventStart = getIndexByType(allEvents, 'start');
            let indexEventStop = getIndexByType(allEvents, 'stop');
            let indexEventSpan = getIndexByType(allEvents, 'span');

            validadeEvent(indexEventStart, 'start');
            validadeEvent(indexEventStop, 'stop');
            validadeEvent(indexEventSpan, 'span');


            let span = allEvents[indexEventSpan];
            let begin = format(new Date(span.begin).setHours(0), 'HH:mm');
            let end = format(new Date(span.end).setHours(0), 'HH:mm');

            let filtereds = filterDataEvents(allEvents);

            validadeEventsData(filtereds);

            let ordered = filtereds.sort(orderedByBrowserAndOs);

            let labels = [begin, end];
            let datasets = [];
            ordered.forEach(event => {
                let select = allEvents[indexEventStart].select;
                select.forEach(item => {
                    if (event.hasOwnProperty(item)) {
                        let label = toTitle(event.os + '_' + event.browser + '_' + item);
                        let plotValue = Object.getOwnPropertyDescriptor(event, item).value;
                        let index = datasets.findIndex((element) => element.label === label);
                        if (index === -1) {
                            datasets.push(factoryData(label, plotValue));
                        } else {
                            datasets[index].data.push(plotValue);
                        }

                    }

                });
            })

            mountChar(labels, datasets);

            console.log(datasets);
            console.log(window.devicePixelRatio);
        } catch (e) {
            alert(e);
        }
    }

    const mountChar = (labels, datasets) => {
        setState({labels: labels, datasets: datasets});
    }

    return (
        <div className="container-fluid">
            <TopBar title="Thiago Jonatan's Challenge"/>
            <EditorCode setValue={setJsonValue} value={jsonValue}/>
            <div className="chart chart-container">
                <Line height={70}
                    data={state}
                    options={{
                        responsive: true,
                        legend: {
                            display: true,
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                defaultFontSize: '8px'
                            }
                        },
                        scales: {
                            xAxes: [{
                                display: true

                            }],
                            yAxes: [{
                                display: true

                            }]
                        }
                    }}
                />
            </div>
            <footer className="footer generate-chat-footer">
                <button className="btn btn-primary generate-chat-button" onClick={onClick}>Generate Chart</button>
            </footer>
        </div>

    )
}