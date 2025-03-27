import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Home from './containers/Public/Home';
import NotFound from './containers/Public/404';
import Register from './containers/Public/Register';
import Homepage from './containers/Public/Homepage';
import { path } from './ultils/constant'; // Đảm bảo file này tồn tại
import Tarot from './containers/Public/Tarot/Tarot';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path={path.HOME} element={<Home />}>
              <Route index element={<Homepage />} />
              <Route path={path.TAROT} element={<Tarot />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path={path.REGISTER} element={<Register />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;