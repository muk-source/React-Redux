const redux = require("redux");
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

function orderCake() {
  // action_creator
  return {
    // action
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(payload) {
  return {
    type: CAKE_RESTOCKED,
    payload: payload,
  };
}

function orderIceCream() {
  // action_creator
  return {
    // action
    type: ICECREAM_ORDERED,
    payload: 1,
  };
}

function restockIceCream(payload) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: payload,
  };
}

const initialCakeState = {
  numOfCakes: 10,
};
const initialIceCreamState = {
  numOfIceCreams: 20,
};

const cakereducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};
const icecreamreducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

const rootreducer = combineReducers({
  cake: cakereducer,
  icecream: icecreamreducer,
});

const store = redux.createStore(rootreducer);
console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Update Status", store.getState());
});

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const action = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);

action.orderCake();
action.orderCake();
action.orderCake();
action.restockCake(3);
action.orderIceCream();
action.orderIceCream();
action.orderIceCream();
action.restockIceCream(3);

unsubscribe();
