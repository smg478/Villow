import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { getListings, fetchListings } from "../../store/listingsReducer";
import ListingItem from "../listing/ListingIndexItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

const ListingsPage = () => {
	const dispatch = useDispatch();
	const listings = useSelector(getListings);
	const [reveresed, setReversed] = useState(false);

	useEffect(() => {
		dispatch(fetchListings());
	}, []);

	const history = useHistory();
	const [isModalOpen, setIsModalOpen] = useState(true);

	const handleOpenModal = () => {
		setIsModalOpen(true);
		history.push("/listings/listingId");
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		history.push("/listings");
	};

	const currentUser = useSelector((state) => {
		return state.user.active;
	});

	const listingStyling = {
		flexBasis: "49%",
		maxWidth: "49%",
		height: "281px",
	};

	const thumbnailStyling = {
		height: "171px",
	};

	const handleClick = (e) => {
		e.preventDefault();
		debugger
		setReversed(!reveresed);
	};

	return (
		<>
			{/* <Link
				to={`listings/${1}/edit`}
				style={{
					width: "200px",
					backgroundColor: "blue",
					height: "40px",
					color: "white",
					fontWeight: "800",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				Edit report
			</Link> */}

			<div className="index-container">
				<div className="listing-container-header">
					<h1>Manhattan NY Real Estate & Homes For Sale</h1>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<div className="listing-container-header__btn_container">
							<button className="btn1">
								<span>{listings.length}</span> Agent listings
							</button>
							<button className="btn2">
								{" "}
								<span>0</span> Agent listings
							</button>
						</div>
						<FontAwesomeIcon
							icon={faArrowUp}
							onClick={handleClick}
						/>
					</div>
				</div>
				<div className="listings-container">
					{reveresed
						? listings
								.reverse()
								.map((listing, i) => (
									<ListingItem
										key={i}
										listing={listing}
										style
										listingStyling={listingStyling}
										thumbnailStyling={thumbnailStyling}
										userId={currentUser.id}
									/>
					))
						: listings.map((listing, i) => (
								<ListingItem
									key={i}
									listing={listing}
									style
									listingStyling={listingStyling}
									thumbnailStyling={thumbnailStyling}
									userId={currentUser.id}
								/>
						  ))}
				</div>
			</div>
		</>
	);
};

export default ListingsPage;