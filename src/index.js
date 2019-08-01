import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

function NavigationApp(props) {

    function getInformation(jsonString) {
        let extractedInformation = jsonString;
        let findLinksStartIndex = extractedInformation.indexOf("_links");
        extractedInformation = extractedInformation.substring(0, findLinksStartIndex - 2);
        return extractedInformation.concat("}");
    }

    const informationData = getInformation(props.data);
    const linksData = getLinks(props.data);

    return (
        <div>
            <Header/>
            <SideBar/>
            <InformationField data={informationData}></InformationField>
            <LinksField data={linksData}></LinksField>
        </div>

    );
}

const LinksField = ({data}) => {
    if (!data) {
        return null;
    }
    if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean'){
        return <p>{data}</p>
    }
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
                    <LinksField data={data[entry]}/>
                </div>
            }
        )}
        </div>);
        //return <p>{data[0].href}</p>;
    } else {
        propertyKeys = Object.keys(data);
            if (propertyKeys.length === 0) {
                return <p>{data}</p>
            }
        return (<div>{propertyKeys.map((key) => {
                return <div>
                    <p>{key}</p>
                    <LinksField data={data[key]}/>
                </div>
            }
        )}
        </div>);
    }
}

function InformationField(props) {
    return (
        <div className={InformationField}>
            <p>{props.data}</p>
        </div>
    )
}

function Header(props) {
    return (
        <div className={Header}>
            <h1>Velkommen til play-with-fint navigasjon</h1>
        </div>
    );
}

function SideBar(props) {
    return (
        <div className={SideBar}>
            <h1>Her kommer det en "side bar"</h1>
        </div>
    );
}

function getLinks(jsonString) {
    return JSON.parse(jsonString)._links;

}

const dataFromServer = '{"kontaktinformasjon":{"epostadresse":"RoseSta@jourrapide.com","mobiltelefonnummer":"48213268"},"postadresse":{"adresselinje":["Setra vei 207"],"postnummer":"0786","poststed":"Oslo"},"bostedsadresse":{"adresselinje":["Setra vei 207"],"postnummer":"0786","poststed":"Oslo"},"fodselsdato":"1999-02-14T00:00:00Z","fodselsnummer":{"identifikatorverdi":"14029923273"},"navn":{"etternavn":"Støa","fornavn":"Rose"},"_links":{"elev":[{"href":"https://play-with-fint.felleskomponent.no/utdanning/elev/elev/elevnummer/500001"}],"self":[{"href":"https://play-with-fint.felleskomponent.no/utdanning/elev/person/fodselsnummer/14029923273"}]}}';

ReactDOM.render(<LinksField data={getLinks(dataFromServer)}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
