export const modifyReducer = (state = {}, action) => {
    switch (action.type){
        case 'MODIFY':
            return action.payload;
        default: 
            return state;
    }
};