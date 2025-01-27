import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserData } from "../redux/user/userActions";
import { fetchCart } from "../redux/cart/cartAction";
import CartPopup from "./CartPopup";



export const Header = () => {
	const { items } = useSelector((state) => state.cart);
	const { loading, error, userData, token } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = () => setIsOpen(!isOpen);


	useEffect(() => {
		const fetchData = async () => {
			if (token) {
				const result = await dispatch(fetchUserData(token));
				await dispatch(fetchCart());

				console.log("Fetched User Data:", result);
			}
		};
		fetchData();
	}, [dispatch, token]);


	return (
		<nav className="navbar navbar-expand-lg navbar-light">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">Shopi</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<div className="d-flex w-100">
						{/* Left-aligned items */}
						<ul className="navbar-nav me-auto">
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="/">All</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Clothes</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Electronics</a>
							</li>
							<li className="nav-item">
								<a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Furnitures</a>
							</li>
							<li className="nav-item">
								<a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Toys</a>
							</li>
						</ul>
						{/* Right-aligned items */}
						<ul className="nav ms-auto">
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="#">{userData?.email}</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">My Orders</a>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/myaccount">
									My Account
								</Link>
							</li>
							<li className="nav-item">
								<a className="nav-link" onClick={togglePopup}>
									<i className="fas fa-shopping-cart"></i> Cart ({items?.length > 0 ? items?.length : 0})
								</a>
							</li>

						</ul>
					</div>
				</div>
			</div>
			<CartPopup setIsOpen={setIsOpen} isOpen={isOpen} togglePopup={togglePopup} />
		</nav>

	)
}