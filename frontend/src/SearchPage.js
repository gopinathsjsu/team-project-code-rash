import React from 'react';
import './SearchPage.css';
import { Button } from "@material-ui/core";
import SearchResult from "./SearchResult";

function SearchPage() {
    return (
        <div className='searchPage'>
            <div className='searchPage__info'>
                {/*
                <h1>Nearby Hotels </h1>
                <Button variant="outlined">Cancellation Flexibility</Button>
                <Button variant="outlined">Type of place</Button>
                <Button variant="outlined">Price</Button>
                <Button variant="outlined">Rooms and beds</Button>
                <Button variant="outlined">More filters</Button> */}
                <input type="checkbox" id="1"></input>
                <label for="1" style={{}}> &nbsp;Daily Continental Breakfast&nbsp;</label>
                <br></br>
                <input type="checkbox" id="2"></input>
                <label for="2"> &nbsp;Access to fitness room&nbsp;</label>
                <br></br>
                <input type="checkbox" id="3"></input>
                <label for="3"> &nbsp;Access to Swimming Pool/Jacuzzi&nbsp;</label>
                <br></br>
                <input type="checkbox" id="4"></input>
                <label for="4"> &nbsp;Daily Parking&nbsp;</label>
                <br></br>
                <input type="checkbox" id="5"></input>
                <label for="5"> &nbsp;All meals included (Breakfast, Lunch, Dinner)</label>


            </div>

            <SearchResult
                img="https://www.theshelbourne.com/resourcefiles/roomssmallimages/heritage-parkview-guestroom.jpg"
                location="Santa Clara"
                title="Hotel A - Studio apartment"
                description=""
                star={4.3}
                price="$40 per night"
                // total="$"
            />
            <SearchResult
                img="https://static.trip101.com/paragraph_media/pictures/001/676/061/large/969ae4bb-efd1-4fb9-a4e3-5cb3316dd3c9.jpg?1562227937"
                location="Monterey"
                title="Hotel B - Magnaminous Bedroom"
                description=""
                star={4.23}
                price="$60 per night"
                // total="$"
            />

            <SearchResult
                img="https://media.millenniumhotels.com/Live/5/F/9/5F98BD7F-DD50-4C6F-BB0B-A04336CEEA8A/Social%20City%20View%20Double%20Room_w1000.jpg?r=210618092802"
                location="Milpitas"
                title="Hotel C - London Studio Apartments"
                description=""
                star={3.8}
                price="$50 per night"
                // total="$"
            />

            <SearchResult
                img="https://image.insider.com/585029a0dd0895bc548b4b8b?width=750&format=jpeg&auto=webp"
                location="Sacra Mento"
                title="Hotel D - Luxurious Bedroom"
                description=""
                star={3.85}
                price="$50 per night"
                // total="$"
            />

            <SearchResult
                img="https://2486634c787a971a3554-d983ce57e4c84901daded0f67d5a004f.ssl.cf1.rackcdn.com/hotel-indigo-denver-redesign/media/indigo-denver-rooms-premier-city-view-king-5fe113032cdd8.jpg"
                location="Half Moon Bay"
                title="Hotel E - Exquisite Bedroom"
                description=""
                star={4.1}
                price="$65 per night"
                // total="$"
            />
            <SearchResult
                img="https://lh6.googleusercontent.com/LAbDs9JrwGjxAAQoHT1lNnKt4a5_OXDqw7S3hZQajGS30XvPwjynPOA8-afixA6QqxL_g7iPn12dRWTO40GhEyPS7n7CDzRYg61Ib334yCK6ZIPjLNZbZExrLk_8BPvf83fq1Qte"
                location="San Francisco"
                title="Hotel F - Spacious Peaceful Modern Bedroom"
                description=""
                star={5.0}
                price="$55 per night"
                // total="$"
            />

            <SearchResult
                img="https://www.redrockresort.com/wp-content/uploads/2020/12/RR-Standard-2-Queen.jpg"
                location="San Jose"
                title="Hotel G - Spacious Bedroom"
                description=""
                star={4.73}
                price="$45 per night"
                // total="$"
            />


        </div>
    )
}

export default SearchPage
