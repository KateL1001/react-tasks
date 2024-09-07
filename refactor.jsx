// // Убрать дублирование кода Компонент 1 function UserProfile({user}) { return
// (         <div className="user-profile"> <h2>{user.name}</h2>
// <p>Email: {user.email}</p> <p>Age: {user.age}</p>         </div>     ); } //
// Компонент 2 function AdminProfile({admin}) {     return (         <div
// className="admin-profile">            <h2>{admin.name}</h2>
// <p>Email: {admin.email}</p>        <p>Role: {admin.role}</p>         </div>
//   ); }

const { useCallback } = require("react");

function Profile({profile}) {
    return (
        <div
            className={profile.role
            ? "user-profile"
            : "admin-profile"}>
            <h2>{profile.name}</h2>
            <p>Email: {profile.email}</p>
            {profile.role && <p>Role: {profile.role}</p>}
            {profile.age && <p>Age: {profile.age}</p>}
        </div>
    );
}

// Оптимизация производительности 2
const ItemList = React.memo(function ItemList({items}) {
    console.log('ItemList rendered');
    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
})

function App() {
    const [items,
        setItems] = React.useState([]);
    const [count,
        setCount] = React.useState(0);

    const addItem = () => {
        setItems([
            ...items, {
                id: items.length,
                name: `Item ${items.length}`
            }
        ]);
    };

    return (
        <div>
            <button onClick={addItem}>Add Item</button>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
            <ItemList items={items}/>
        </div>
    );
}

//  Разделение ответственности 3 function DataFetcher() {     const [data,
// setData] = React.useState(null);     const [loading, setLoading] =
// React.useState(true);     React.useEffect(() => {       fetch('/api/data')
//      .then((response) => response.json())         .then((data) => {
// setData(data);           setLoading(false);         });     }, []);     if
// (loading) {       return <p>Loading...</p>;     }     return (       <div>
//      <h2>Data</h2>         <pre>{JSON.stringify(data, null, 2)}</pre>
// </div>     );   }

function DataFetcher() {
    const [data,
        setData] = React.useState(null);
    const [loading,
        setLoading] = React.useState(true);
    const [error,
        setError] = React.useState('');

    React.useEffect(() => {
        setLoading(true);
        fetch('/api/data').then((response) => response.json()).then((data) => {
            setData(data);
        }).catch((error) => {
            setError(error);
        }). finally(() => {
            setLoading(false);
        });
    }, []);

    return {data, loading, error};
}

function App() {
    const {data, loading, error} = DataFetcher();
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }
    return (
        <div>
            <h2>Data</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

// 4 Компонент использует устаревшие методы жизненного цикла, такие как
// componentWillReceiveProps и componentWillMount, которые уже не рекомендуются к
// использованию.

// class OldComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: null
//         };
//     }

//     componentWillMount() {
//         this.setState({data: this.props.initialData});
//     }

//     componentWillReceiveProps(nextProps) {
//         if (nextProps.initialData !== this.props.initialData) {
//             this.setState({data: nextProps.initialData});
//         }
//     }

//     render() {
//         return <div>{this.state.data}</div>;
//     }
// }

const newComponent = ({initialData}) => {
    const [data, setData] = React.useState(initialData);
    React.useEffect(() => {
        setData(initialData);
    }, [initialData]);
    return <div>{data}</div>;
};


// Оптимизация компонента
function HeavyComponent({ data }) {
    const [count, setCount] = React.useState(0);
  
    // const processedData = data.map((item) => {
    //   // Симуляция тяжелых вычислений
    //   let sum = 0;
    //   for (let i = 0; i < 1000000; i++) {
    //     sum += i;
    //   }
    //   return { ...item, sum };
    // });
    const processedData = uSeMemo(() => data.map((item) => {
      // Симуляция тяжелых вычислений
      let sum = 0;
      for (let i = 0; i < 1000000; i++) {
        sum += i;
      }
      return { ...item, sum };
    }), [data]);
  
    return (
      <div>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
        <p>Count: {count}</p>
        <ul>
          {processedData.map((item) => (
            <li key={item.id}>{item.name} - {item.sum}</li>
          ))}
        </ul>
      </div>
    );
  }

//7 Рефакторинг с использованием кастомного хука

function fetchUser(userId) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        setLoading(true);
        fetch(`/api/users/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            setUser(data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
          });
    }, [userId]);

    return {user, loading, error};
    
}

function UserProfile({ userId }) {
    const { user, loading, error } = fetchUser(userId);  

    // const [user, setUser] = React.useState(null);
    // const [loading, setLoading] = React.useState(true);
    // const [error, setError] = React.useState(null);

    // React.useEffect(() => {
    //     setLoading(true);
    //     fetch(`/api/users/${userId}`)
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setUser(data);
    //         setLoading(false);
    //       })
    //       .catch((err) => {
    //         setError(err);
    //         setLoading(false);
    //       });
    // }, [userId]);
   
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
    );
  }

  // 8
//   Есть компонент, который использует функции обратного вызова, и они создаются заново при каждом рендере, что приводит к излишним ререндерам дочерних компонентов.

  //обертка мемо
const ChildComponent = React.memo(({ text, onTextChange }) => {
    console.log('ChildComponent rendered');
    return (
      <div>
        <input type="text" value={text}  
            onChange={onTextChange} />
      </div>
    );
});

function ParentComponent() {
    const [count, setCount] = React.useState(0);
    const [text, setText] = React.useState('');
  
    const handleClick = () => {
      setCount(count + 1);
    };

    const onTextChangeFn = useCallback((e) => {
        setText(e.target.value);
    },[]);
  
    return (
      <div>
        <button onClick={handleClick}>Increment Count</button>
        <p>Count: {count}</p>
        <ChildComponent text={text}
        //  onTextChange={(e) => setText(e.target.value)}
         onTextChange={onTextChangeFn}
        />
      </div>
    );
}

//9
// Есть компонент, который выполняет много действий в хуке useEffect, что приводит к излишним рендерам и неэффективному использованию ресурсов. Также в компоненте используются функции, которые пересоздаются при каждом рендере, что приводит к ненужным ререндерам дочерних компонентов.
function Dashboard({ fetchData }) {
    const [data, setData] = React.useState([]);
    const [count, setCount] = React.useState(0);
  
    // useEffect(() => {
    //   fetchData().then(fetchedData => setData(fetchedData));
    // }, [fetchData]);
  
    // const increment = () => {
    //   setCount(count + 1);
    // };
    useEffect(() => {
        fetchData().then(fetchedData => mount && setData(fetchedData));
    }, []);

    const increment = React.useCallback(() => {
      setCount((prev) => prev + 1);
    }, []);
  
    const reset = () => {
      setCount(0);
    };
  
    return (
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
        <p>Count: {count}</p>
        <DataList data={data} />
      </div>
    );
  }
  //memo wrap
const DataList = React.memo(function DataList({ data }) {
    return (
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
});

// переписать с использованием react hook form
// function RegistrationForm() {
//     const [username, setUsername] = React.useState('');
//     const [email, setEmail] = React.useState('');
//     const [password, setPassword] = React.useState('');
  
//     const handleSubmit = (event) => {
//       event.preventDefault();
//       // Отправка данных формы
//       console.log({ username, email, password });
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     );
// }

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    text: string
    email: string
    password: string
}
function RegistrationForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>();
      const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input
            type="text"
            {...register("text", { required: true })}
          />
          {errors.text && <span>This field is required</span>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    );
}

//11
//  переписать компонент с useRef

function SearchBox() {
    // const [query, setQuery] = React.useState('');
  
    // const handleInputChange = (e) => {
    //   setQuery(e.target.value);
    // };
    const ref = React.useRef(null);
    const handleInputChange = (e) => {
      ref.current.focus();
    }
  
    return (
      <div>
        <input ref={ref} type="text"   />
        <p onClick={handleInputChange}>Search Query: {ref.current.value}</p>
      </div>
    );
}

// 12
// Создайте кастомный хук useGlobalState для управления глобальным состоянием, используя useReducer, и замените контексты на использование этого хука.

const GlobalContext = React.createContext();

function useGlobalStateReducer(state, action) {
    switch (action.type) {
        case 'setUser':
            return { ...state, user: action.user };
        case 'setTheme':
            return { ...state, theme: action.theme };
        default:
            throw new Error();
    }
}

function App() {
//   const [user, setUser] = React.useState({ name: 'John', age: 30 });
//   const [theme, setTheme] = React.useState('light');

  const [state, dispatch] = React.useReducer(useGlobalState, {
    user: { name: 'John', age: 30 },
    theme: 'light',
});

  return (
      <GlobalContext.Provider value={{ state, dispatch }}>
        <Dashboard />
      </GlobalContext.Provider>
  );
}

function Dashboard() {
//   const { user } = React.useContext(UserContext);
//   const { theme } = React.useContext(ThemeContext);
const { state } = React.useContext(GlobalStateContext);

  return (
    <div>
      <h1>Welcome, {state.user.name}</h1>
      <p>Current Theme: {state.theme}</p>
    </div>
  );
}
  
