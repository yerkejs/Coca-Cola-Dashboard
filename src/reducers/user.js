
const initialState = {
    user: "LOADING",
    data: []
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case "SET_USER":
          return {
            ...state, user: action.user
          }
        case "SET_DATA":
          return {
            ...state, data: action.data
          }
        default:
            return state;
    }
}
