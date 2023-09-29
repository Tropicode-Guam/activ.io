"use client";

import * as L from "leaflet";
import Image from "next/image";
import ReactDOMServer from "react-dom/server";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaDirections } from "react-icons/fa";
import { GestureHandling } from "leaflet-gesture-handling";
import "leaflet/dist/leaflet.css";

const MAP_TILE = L.tileLayer(
	`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
	{
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}
);

interface IconMap {
	[key: string]: L.Icon | undefined;
}

export interface Point {
	id: number;
	title: string;
	desc: string;
	pos: L.LatLngTuple;
	img: string;
	type: string;
	state: string;
}

interface MapProps {
	points: Point[];
	center: number[];
}

export default function Map({ points, center }: MapProps) {
	const mapRef = useRef<L.Map | null>(null);
	const markerRefs = useRef<L.Marker[]>([]);
	const firstRender = useRef(false);
	const initialMarker = useRef<L.Marker | null>(null);
	const [scroll, setScroll] = useState(0);
	const [popupClosed, setPopupClosed] = useState(false);

	// init
	useEffect(() => {
		const mapParams: L.MapOptions = {
			center: L.latLng(center[0], center[1]),
			zoom: 11,
			zoomControl: false,
			maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
			layers: [MAP_TILE],
            // ignore the below line: gesture handler doesnt use a type, but is useful for map gestures
            // @ts-ignore
			gestureHandling: true,
		};

		L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
		mapRef.current = L.map("map", mapParams);
		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
			}
		};
	}, []);

	//control
	useEffect(() => {
		L.control
			.zoom({
				position: "topright",
			})
			.addTo(mapRef.current!);
	}, []);

	//markers
	useEffect(() => {
		const icons: IconMap = {
			hike: L.icon({
				iconUrl: "hike_marker.png",
				iconSize: [20, 35],
				iconAnchor: [10, 35],
				popupAnchor: [0, -5],
			}),
			default: L.icon({
				iconUrl: "marker.png",
				iconSize: [20, 35],
				iconAnchor: [10, 35],
				popupAnchor: [0, -5],
			}),
		};
		const chosenPoint = Math.floor(Math.random() * points.length);

		points.forEach((p: Point, i: number) => {
			const icon = (icons as any)[p.type] ?? icons.default;
			const marker = L.marker(p.pos, { icon: icon }).addTo(
				mapRef.current!
			);

			marker.bindPopup(
				`
                <div class="bubble">` +
					ReactDOMServer.renderToString(
						<Image
							src={p.img}
							alt={p.title}
							width={225}
							height={100}
						></Image>
					) +
					`<div class="content">` +
					ReactDOMServer.renderToString(
						<div className="bubble-title-container">
							<Link href={"/places/" + p.id}>
								<b>{p.title}</b>
							</Link>
							<a
								target="_blank"
								href={`https://maps.google.com?q=${(
									p.title +
									" " +
									p.state
								)
									.split(" ")
									.join("+")}`}
							>
								<FaDirections />
							</a>
						</div>
					) +
					`   <p>${p.desc}...</p>
                    <div>
                </div>
            `
			);

			if (!firstRender.current && chosenPoint == i) {
				marker.openPopup();
				initialMarker.current = marker;
				firstRender.current = true;
			}
		});
	}, [points]);

	useEffect(() => {
		function handleScroll(e: Event) {
			setScroll(window.scrollY);
			if (window.scrollY > 5) {
				if (!popupClosed) {
					setPopupClosed(true);
					initialMarker.current?.closePopup();
				}
			}
		}
		document.addEventListener("scroll", handleScroll);
		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, []);

	//eventhandler
	useEffect(() => {}, []);

	return (
		<>
			<div id="map"></div>
		</>
	);
}
