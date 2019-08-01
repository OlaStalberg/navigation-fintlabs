import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

function NavigationApp() {
    const [url, setURL] = useState('https://play-with-fint.felleskomponent.no/utdanning/elev/person/fodselsnummer/14029923273');
    const [json, setJson] = useState('');

    useEffect(() => {
        console.log("useEffect Triggered")
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                    setJson(result);
                }
            )
    });

    const DataField = ({data}) => {
        let propertyKeys = [];
        if (Array.isArray(data)) {
            for (let entry in data) {
                propertyKeys.push(entry);
            }
            if (propertyKeys.length === 0) {
                return <p>{data}</p>
            }
            return (<div>{propertyKeys.map((entry) => {
                    return <div>
                        <DataField data={data[entry]}/>
                    </div>
                }
            )}
            </div>);
        } else if (typeof data === 'object' && data !== null) {
            propertyKeys = Object.keys(data);
            if (propertyKeys.length === 0) {
                return <p>{data}</p>
            }
            return (<div>{propertyKeys.map((key) => {
                    return <div>
                        <p>{key}</p>
                        <DataField data={data[key]}/>
                    </div>
                }
            )}
            </div>);
        } else {
            if (typeof data === 'string' && validURL(data)) {
                return <button onClick={() => setURL(data)}>{data}</button>
            }
            return <p><b>{data}</b></p>;
        }
    };

    return (
        <div>
            <Header/>
            <DataField data={json}></DataField>
        </div>
    );
}


function Header() {
    return (
        <div>
            <h1>Velkommen til play-with-fint navigasjon</h1>
        </div>
    );
}

ReactDOM.render(<NavigationApp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' + //
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(str);
}
