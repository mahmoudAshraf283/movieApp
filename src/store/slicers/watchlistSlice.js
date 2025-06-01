import { createSlice } from "@reduxjs/toolkit";
const watchlistSlice = createSlice (
    {
        name:"watchlist",
        initialState:{
            data:[],
            //TODO: Add badge in Header component that displays count
            count:0
        },
        reducers:{
            //Passed the movie object in the payload
            //To Use:
            //1.import { addTowatchlist } from "./store/slicers/watchlistSlice";
            //2.call addTowatchlist by useDispatch() hook and pass the movie object in payload
            addTowatchlist: function (state , action){
                state.data.push(action.payload)
                state.count += 1
            },
            //Passed movie id property of the target movie
            removeFromwatchlist: function (state , action) {
                state.data = state.data.filter ((movie) => movie.id !== action.payload)
                state.count -= 1
            }
        }
    }
)

export const {addTowatchlist , removeFromwatchlist} = watchlistSlice.actions;
export default watchlistSlice.reducer;