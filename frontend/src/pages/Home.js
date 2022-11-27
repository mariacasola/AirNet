import Jumbotron from "../components/cards/Jumbotron"; 
import { useAuth } from "../context/auth"; 

export default function Home() {
    return (
        <div>
          <Jumbotron title="Hello World"/>
          <pre>{JSON.stringify(useAuth(), null, 4)}</pre>
  
      </div>
    );
  }