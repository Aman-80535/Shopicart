import { Header } from "./Header";
import { fetchProducts } from "../redux/user/userActions";
import { addToCart, fetchCart } from "../redux/cart/cartAction";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "../styles/Home.css"

export const Home = () => {
	const [searckKey, setSearchKey] = useState("");
	const [filteredData, setFilteredData] = useState("");
	const [Error, setError] = useState("");
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector((state) => state.user);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchProducts());
				await dispatch(fetchCart());
				console.log(products)
			} catch (error) {
				console.error("Error fetching products:", error);
				setError(error.message)
			}
		};


		fetchData();
	}, []);

	useEffect(() => {
		if (searckKey === "") {
			setFilteredData(products);
		} else if (searckKey.length > 0) {
			console.log("lllllll", searckKey)
			const filtered = products.filter((item) =>
				item.title.toLowerCase().includes(searckKey.toLowerCase()) ||
				item.title.toLowerCase().includes(searckKey.toLowerCase()) ||
				item.category.name.toLowerCase().includes(searckKey.toLowerCase())
			);
			setFilteredData(filtered);
		}
	}, [searckKey]);

	function handleSearch(value) {
		setSearchKey(value)
	}


	const handleAddToCart = async (product) => {
		const fetchData = async () => {
			try {
				await dispatch(addToCart(product));
				await dispatch(fetchCart());
				
			} catch (error) {
				console.error("Error fetching products:", error);
				setError(error.message)
			}
		};

		fetchData();
	}

	if (loading) return <div className="container text-center">Loading...</div>;
	if (Error) return <div>Error: {Error}</div>;

	return (
		<div classNameName="container">
			<p classNameName="text-center" style={{ textAlign: "center" }}>Home</p>
			<div style={{ textAlign: "center", width: "100%" }}>
				<input
					classNameName="text-center"
					placeholder="Search a Product"
					style={{
						textAlignLast: "center",
						height: "3rem",
						width: "32%",
						border: "1px solid",
						borderRadius: "56px",
					}}
					value={searckKey}
					onChange={(event) => handleSearch(event.target.value)}
				/>
			</div>
			<div className="container mt-4">
				<div className="row">
					{(filteredData.length > 0 ? filteredData : products).map((product) => (
						<div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={product.id}>
							<div className="card" style={{ height: "100%" }}>
								<img
									src={product.images[0]}
									alt={product.name}
									className="card-img-top"
									style={{ height: "200px", objectFit: "cover" }}
								/>
								<span
									style={{
										position: "absolute",
										top: "10px",
										right: "10px",
										backgroundColor: "rgba(0, 0, 0, 0.6)", // Background to make the text visible
										color: "white",
										borderRadius: "50%",
										padding: "5px 10px",
										fontSize: "18px",
										cursor: "pointer",
									}}
									onClick={() => handleAddToCart(product)}
								>
									+
								</span>
								<div className="card-body">
									<p className="card-text">{product.category?.name}</p>
									<h5 className="card-title">{product.name}</h5>
									<p className="card-text">{product.title}</p>
									<p className="card-text">Price: ${product.price}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div >

	)
}