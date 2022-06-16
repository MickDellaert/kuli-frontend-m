import "./company-home.css";

import { get } from "../../api/get";
import { useState, useEffect } from "react";

import Navigation from "../../components/navigation/Navigation";
import CompanySearch from "./CompanySearch";
import CompanyList from "./CompanyList";
import CompanyFilterBar from "./CompanyFilterBar";

const CompanyHome = () => {
  const [searchInput, setSearchInput] = useState("");
  const [companies, setCompanies] = useState([]);
  const [badges, setBadges] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);

  const [resultsFound, setResultsFound] = useState(true);

  const [selectedCompanies, setSelectedCompanies] = useState(companies);

  const fetchCompanies = async () => {
    const result = await get("companies?populate=*");
    setCompanies(result.data);
  };

  const fetchBadges = async () => {
    const result = await get("badges");
    setBadges(result.data);
  };

  const fetchSectors = async () => {
    const result = await get("sectors");
    setSectors(result.data);
  };

  useEffect(() => {
    fetchCompanies();
    fetchBadges();
    fetchSectors();
  }, []);

  useEffect(() => {
    // if (companies.length) {
    // setCompanies(tempData);
    // console.log(companies);
    // setBadges(badges);
    // console.log(badges);
    // setSelectedCompanies(companies);
    // console.log(selectedCompanies);
    // console.log(selectedBadges);
    // console.log(companies[11].attributes.badges.data);
    // console.log(companies.attributes);
    // console.log(tempData);
    // console.log(sectors);
    // console.log(selectedSectors);
    // }
  }, []);

  const handleBadges = (e) => {
    const { checked, value } = e.target;
    const badgeId = e.currentTarget.id;
    const badgeNumber = parseInt(badgeId, 10);

    // console.log(checked, value);
    // console.log(e.target);
    // console.log("checked: " + checked);
    // console.log("value: " + value);
    // console.log("badge id: " + badgeId);
    // console.log("badge number: " + badgeNumber);

    if (checked) {
      setSelectedBadges((selectedBadges) => [...selectedBadges, value]);
    } else {
      setSelectedBadges(selectedBadges.filter((e) => e !== value));
    }
    // console.log(selectedBadges)
  };

  const handleSectors = (e) => {
    const { checked, value } = e.target;
    const sectorId = e.currentTarget.id;
    const sectorNumber = parseInt(sectorId, 10);

    // console.log(checked, value);
    // console.log(e.target);
    // console.log("checked: " + checked);
    // console.log("value: " + value);
    // console.log("sector id: " + sectorId);
    // console.log("sector number: " + sectorNumber);

    if (checked) {
      setSelectedSectors((selectedSectors) => [
        ...selectedSectors,
        value,
      ]);
    } else {
      setSelectedSectors(selectedSectors.filter((e) => e !== value));
    }
    console.log(selectedSectors);
  };

  // const clearFilters = () => {
  //   setSelectedBadges([]);
  // };

  const applyFilters = () => {
    let filteredCompanies = companies;

    if (selectedBadges.length > 0) {
      filteredCompanies = filteredCompanies.filter((company) =>
        company.attributes.badges.data.some((badge) =>
          selectedBadges.includes(badge.attributes.name)
        )
      );
    }

    if (selectedSectors.length > 0) {
      filteredCompanies = filteredCompanies.filter((sector) =>
        sector.attributes.sectors.data.some((sector) =>
          selectedSectors.includes(sector.attributes.name)
        )
      );
    }

    if (searchInput) {
      filteredCompanies = filteredCompanies.filter((company) =>
        company.attributes.name
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    }

    // if (searchInput) {
    //   filteredCompanies = filteredCompanies.filter(
    //     (item) =>
    //       item.attributes.name.toLowerCase().search(searchInput.toLowerCase().trim()) !==
    //       -1
    //   );
    // }

    setSelectedCompanies(filteredCompanies);

    !searchInput.length && !selectedBadges.length && !selectedSectors.length
      ? setResultsFound(false)
      : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedBadges, selectedSectors, searchInput]);

  return (
    <>
      <Navigation />
      <div className="company-container">
        <div className="company-content-container">
          <CompanySearch
            selectedBadges={selectedBadges}
            selectedSectors={selectedSectors}
            value={searchInput}
            getInput={(e) => setSearchInput(e.target.value)}
          />
          <div className="company-filter-and-list-container">
            <CompanyFilterBar
              badges={badges}
              sectors={sectors}
              handleBadges={handleBadges}
              handleSectors={handleSectors}
              selectedBadges={selectedBadges}
            />

            <CompanyList
              companies={companies}
              selectedCompanies={selectedCompanies}
              selectedBadges={selectedBadges}
              searchInput={searchInput}
              resultsFound={resultsFound}
            />
          </div>
          {/* <button onClick={clearFilters}></button> */}
        </div>
      </div>
    </>
  );
};

export default CompanyHome;
