
import '../styles/main.css'
import daPanImage from '../images/dapan3.jpg';

const Home = () => {
    return (
    <article>
        <h1>This is a HomePage</h1>
        <h2>HELLO WORLD</h2>
        <img src={daPanImage} alt='Da Pan >= 3 .jpg' />
    </article>
    )
};

export default Home;