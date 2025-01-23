import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import LoginCard from './LoginCard.jsx'
import NotPage from './NotPage.jsx'
import { useEffect } from 'react'

const BodyStyling = (styleObject) => {
    useEffect(() => {
        Object.entries(styleObject).forEach(([key, value]) => {
            document.body.style[key] = value;
        });

        return () => {
            Object.keys(styleObject).forEach((key) => { 
                document.body.style[key] = '';
            })
        };
    }, [styleObject]);
};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path='/' element={ <Navigate to='/login' /> } />
                    <Route path='/login' element={<LoginCard BodyStyling={BodyStyling}/>} />
                    <Route path="*" element={<NotPage  BodyStyling={BodyStyling}/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;