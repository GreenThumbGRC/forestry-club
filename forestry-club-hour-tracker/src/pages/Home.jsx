import Dropdown from "../components/Dropdown.jsx";

function Home() { 

    const exampleData = [
        `Liam Bennett`,
        `Sophia Carter`,
        `Ethan Mitchell`,
        `Isabella Flores`,
        `Noah Patterson`,
        `Ava Richardson`,
        `Mason Brooks`,
        `Emily Griffin`,
        `Lucas Hayes`,
        `Chloe Sullivan`,
    ];

    return (
        <>
            <p>Home</p>
            <Dropdown id="name-select" data={exampleData} />
            <div><a href='/adminReview'>Admin View</a></div>
            <div><a href='/member'>Member View</a></div>
            <div><a href='/adminClub'>Admin Club View</a></div>
            <div><a href='/addMember'>Add club member</a></div>
        </>
    );
}

export default Home;