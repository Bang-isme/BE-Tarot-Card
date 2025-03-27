
import Footer from "./Footer";
import Navbar from "./Navbar";
import Tarot from "./Tarot/Tarot";


const Home = () => {

    return (
        <div>           
            <Navbar />
            <div >
                <div >
                    <Tarot />
                </div>
            </div>
            <Footer />
        </div>
           
    );
}

export default Home;