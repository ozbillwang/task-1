import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="Challenge">
        <img 
          src="https://ozbillwang.github.io/assets/img/me_formal_face_small.jpg" 
          alt="Bill Wang Profile" 
          className="profile-image"
        />
        <p>
          This is Bill Wang’s website
        </p>
        <a 
          href="https://github.com/ozbillwang/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="profile-link"
        >
          Visit my profile
        </a>
      </header>
    </div>
  );
}

export default App;
