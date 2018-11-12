import React, { Component } from 'react';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Highlight,
    RefinementList,
    Pagination,
    CurrentRefinements,
    ClearRefinements,
    Configure,
    PoweredBy
} from 'react-instantsearch-dom';
import 'instantsearch.css/themes/reset.css';
import './SearchCourse.css';

//Refinement list would be good
//100+ is upper div 200+ grad
function Course({ hit }) {
    return (
        <div style={{ padding: '10px' }}>
            <span className="hit-name">
                <Highlight attribute="courseTitle" hit={hit} tagName="mark" />
                <p><Highlight attribute="description" hit={hit} tagName="mark" /></p>
                <p>
                    Instrutor: <Highlight attribute="lecture.Instructor" hit={hit} tagName="mark" />
                    <br/>Days and Times: <Highlight attribute="lecture.DaysTimes" hit={hit} tagName="mark" />
                    <br/>Room: <Highlight attribute="lecture.Room" hit={hit} tagName="mark" />
                </p>
            </span>
        </div>
    );
}

/*RefinementList used to refine searches with like a checkbox list
*so probably not necessary
*/
function Search() {
    return (
        <div className="container">
            <CurrentRefinements />
            <ClearRefinements />
            <SearchBox  />
            <RefinementList attribute="career" />
            <Hits hitComponent={Course} />
            <Configure hitsPerPage={10} />
            <Pagination showLast={true} />
            <PoweredBy />
        </div>
    );
}

//we need to create an indexName on the algolia dashboard
//we can also consider using connectors to implement different UI

const App = () => (
    <InstantSearch
        apiKey="e0f4e3542265d408d5be8de22d00a12e"
        appId="Z4ZULV1BRS"
        indexName="Slug Academic Organizer"
    >
        <Search />
    </InstantSearch>
)

class SearchCourse extends Component {
    render() {
        return (
            <App />
        );
    }
}

export default SearchCourse