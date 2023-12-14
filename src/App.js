import React from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import './style.css';


export default function App() {
    return (
        <div className="container">
            <Header />
            <MainContent />
        </div>
    );
}
