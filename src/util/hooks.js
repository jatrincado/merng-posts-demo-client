import { useState, useRef, useCallback } from "react";

export const useForm = (callback, initialState = {}) => {
	const [values, setValues] = useState(initialState);

	const onChange = (event) => {
		// se necesita poner los valores actuales para que se mantengan
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		callback();
	};

	return {
		onChange,
		onSubmit,
		values,
	};
};

export const useObserver = (
	callback,
	{ root = null, threshold = 1.0 } = {},
	arr
) => {
	const intersectionObserver = useRef();
	const callbackRef = useRef();
	callbackRef.current = callback;

	if (arr && !Array.isArray(arr)) {
		throw new Error("Pass in an array as the third argument");
	}

	const getDep = () => {
		if (arr) {
			return [callback, root, threshold, ...arr];
		}
		return [callback, root, threshold];
	};

	return useCallback((node) => {
		if (intersectionObserver.current) {
			intersectionObserver.current.disconnect();
		}

		if (node) {
			intersectionObserver.current = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						callbackRef.current();
					}
				},
				{ root, threshold }
			);

			intersectionObserver.current.observe(node);
		}
		// eslint-disable-next-line
	}, getDep());
};
