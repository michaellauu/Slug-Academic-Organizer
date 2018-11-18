import React, { Component } from 'react';
import {
    InstantSearch,
    Hits,
    connectHits, 
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
import { Button, UncontrolledCollapse } from 'reactstrap';
import { CollapsibleComponent, CollapsibleHead, CollapsibleContent } from 'react-collapsible-component'

/*
*Used to display course information (course Title, description, instructor, days, times, room)
*parts of the course will highlight when user is searching in searchbar
*/
/*const Course = connectHits(({ hits }) => (    
    <div style={{ padding: '10px' }}>
        {hits.map(hit =>
            <span key={hit.objectID}>
                <Button id={hit.courseID}>
                    {<Highlight attribute="courseTitle" hit={hit} tagName="mark" />}
                </Button>
                <Button onClick={console.log(hit)}>pls</Button>
                <UncontrolledCollapse toggler={'#' + hit.courseID}>
                    <p><Highlight attribute="description" hit={hit} tagName="mark" /></p>
                    <p>
                        Instructor: <Highlight attribute="lecture.Instructor" hit={hit} tagName="mark" />
                        <br />Days and Times: <Highlight attribute="lecture.DaysTimes" hit={hit} tagName="mark" />
                        <br />Room: <Highlight attribute="lecture.Room" hit={hit} tagName="mark" />
                    </p>
                </UncontrolledCollapse>
            </span>
        )}
    </div>
));*/
function Course({ hit }) {
    return (
        <div style={{ padding: '10px' }}>
            <span className="hit-name">
                <Button id={hit.courseID}>
                    {<Highlight attribute="courseTitle" hit={hit} tagName="mark" />}
                </Button>
                <Button onClick={console.log(hit)}>pls</Button>
                <UncontrolledCollapse toggler={'#' + hit.courseID}>
                    <p><Highlight attribute="description" hit={hit} tagName="mark" /></p>
                    <p>
                        Instructor: <Highlight attribute="lecture.Instructor" hit={hit} tagName="mark" />
                        <br />Days and Times: <Highlight attribute="lecture.DaysTimes" hit={hit} tagName="mark" />
                        <br />Room: <Highlight attribute="lecture.Room" hit={hit} tagName="mark" />
                    </p>
                </UncontrolledCollapse>
            </span>
        </div>
    );
}

/*
*Used to implement widgets
*Refinment List in collapsible menus, Current Refinements, Pagination
*Collapsile Menu: https://www.npmjs.com/package/react-collapsible-component
*/
function Search() {
    return (
        <div className="container">
            <SearchBox />
            <h3>Filters</h3>
            <CollapsibleComponent>
                <CollapsibleHead>Career</CollapsibleHead>
                <CollapsibleContent><RefinementList attribute="meta.career" /></CollapsibleContent>

                <CollapsibleHead>Type</CollapsibleHead>
                <CollapsibleContent><RefinementList attribute="meta.type" /></CollapsibleContent>

                <CollapsibleHead>Credits</CollapsibleHead>
                <CollapsibleContent><RefinementList attribute="meta.credits" /></CollapsibleContent>

                <CollapsibleHead>Status</CollapsibleHead>
                <CollapsibleContent><RefinementList attribute="meta.status" /></CollapsibleContent>

                <CollapsibleHead>Days and Times</CollapsibleHead>
                <CollapsibleContent><RefinementList attribute="lecture.DaysTimes" /></CollapsibleContent>
            </CollapsibleComponent>
            <div className="Filters">
                <CurrentRefinements />
            </div>
            <button className="clear"><ClearRefinements /></button>
            <Hits hitComponent={Course} />
            <Configure hitsPerPage={10} />
            <div className="pages">
                <Pagination showLast={true} />
            </div>
            <div className="poweredBy">
                <PoweredBy />
            </div>
        </div>
    );
}

//Used for the search
const App = () => (
    <InstantSearch
        apiKey="e0f4e3542265d408d5be8de22d00a12e"
        appId="Z4ZULV1BRS"
        indexName="Slug Academic Organizer"
    >
        <Search />
    </InstantSearch>
)

//renders the search
class SearchCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        console.log("??");
    }

    componentDidMount() {
        window.addEventListener('click', this.handleResize);
    };

    componentWillUnmount() {
        window.removeEventListener('click', this.handleResize);
    }
    render() {
        return (
            <App />
        );
    }
}

export default SearchCourse