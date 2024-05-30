import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Home() {
  return (
    <div>
      <h1>Health Tracker</h1>
      <nav>
        <ul>
          <li><a href="/add" data-link>Add Health Metric</a></li>
          <li><a href="/view" data-link>View Health Metrics</a></li>
        </ul>
      </nav>
    </div>
  );
}


function AddHealthMetric() {
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const healthMetrics = JSON.parse(localStorage.getItem('heaalthMatrica')) || [];
    healthMetrics.push({date, weight, height});
    localStorage.setItem('healthMatrics', JSON.stringify(healthMetrics));
    router.push('?veiw');
  }
  return (
    <div>
      <h1>Add Health Metric</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <br />
        <label>
          Weight (kg):
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </label>
        <br />
        <label>
          Height (cm):
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add Metric</button>
      </form>
    </div>
  );
}

function ViewHealthMetrics() {
  const [healthMetrics, setHealthMetrics] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('healthMetrics')) || [];
    setHealthMetrics(data);
  }, []);

  return (
    <div>
      <h1>View Health Metrics</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight (kg)</th>
            <th>Height (cm)</th>
          </tr>
        </thead>
        <tbody>
          {healthMetrics.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.weight}</td>
              <td>{entry.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const router = useRouter();
  const { pathname } = router;

  let Component;

  if (pathname === '/add') {
    Component = AddHealthMetric;
  } else if (pathname === '/view') {
    Component = ViewHealthMetrics;
  } else {
    Component = Home;
  }

return <Component />;

}