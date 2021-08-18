export const userState = {
    username: '',
    token: '',
    loggedin: false,
    subscription: {},
    isSubscribed: false
}

export const subscriptionState = {
    _id: '',
    plan: '',
    price: 0, 
    session_per_month: 0,
    createdAt: '',
    updatedAt: '',
}


export const State = {
    user: userState,
    subscription: subscriptionState
}

