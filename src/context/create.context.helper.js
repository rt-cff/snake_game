import React, { createContext, useReducer, useCallback, useMemo } from "react";

const getActions = (actions, dispatch, state) => {
	const boundActions = {}
	
	for (let key in actions) {
		// boundActions[key] = actions[key](dispatch, state);

		boundActions[key] = (...p) => {
			console.log('Actions Dispatch: ', key)
			actions[key](dispatch)(...p)
		};
	}

	return boundActions
}

export default (reducer, actions, initialState) => {
	const Context = createContext();

	const Provider = ({ children }) => {
		const [state, dispatch] = useReducer(reducer, initialState);

		const boundActions = useMemo(() => getActions(actions, dispatch), [actions, dispatch]);
		// const boundActions = getActions(actions, dispatch, state);

		return (
			<Context.Provider value={{ state, ...boundActions }}>
				{children}
			</Context.Provider>
		);
	};

	return { Context, Provider };
};
