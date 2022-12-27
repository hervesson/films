import React, { useState, useEffect } from 'react';

const IMDbs = [
   "tt0142237",
   "tt0416449",
   "tt1853728",
   "tt0117218",
   "tt0816692",
   "tt7286456",
   "tt0861739",
   "tt0293662"
]

function App() {
   const [films, setFilms] = useState([])
   const [order, setOrder] = useState("ano")

   useEffect(() => {
      listMovies()
   }, [])

   useEffect(() => {
      if(films.length > 0){
         switch (order) {
            case 'ano':
               const filmsYears = [...films];
               filmsYears.sort(function (a, b) {
                  if (a.Year > b.Year) {
                     return 1;
                  }
                  if (a.Year < b.Year) {
                     return -1;
                  }
                  return 0;
               });
               
               setFilms(filmsYears)
            break;

            case 'nome': 
               const filmsNames = [...films];
               filmsNames.sort(function (a, b) {
                  if (a.Title > b.Title) {
                     return 1;
                  }
                  if (a.Title < b.Title) {
                     return -1;
                  }
                  return 0;
               });

               setFilms(filmsNames)
            break;

            case 'pais': 
               const filmsCountry = [...films];
               filmsCountry.sort(function (a, b) {
                  if (a.Country > b.Country) {
                     return 1;
                  }
                  if (a.Country < b.Country) {
                     return -1;
                  }
                  return 0;
               });
               
               setFilms(filmsCountry)
            break;
         
            default:
               break;
         }
      }
   }, [order, films])
   
   

   const listMovies = async() => {
      Promise.all(IMDbs.map(async (item) => 
         findMovie(item)
      )).then((movies) => {
         setFilms(movies)
      });
   }

   const findMovie = async(movie_id) => {
      const response = await fetch('http://www.omdbapi.com/?i='+movie_id+'&apikey=64af7e26')
      return  await response.json()
   } 

   return (
      <div className='h-screen gap-3'>
         <header className="bg-black flex justify-center items-center h-[10%]">
            <h3 className="text-white text-5xl font-semibold text-yellow-400 tracking-widest">Meus Filmes Favoritos</h3>
         </header>

         <section className='max-w-6xl mx-auto h-[85%] rounded-xl flex  items-center'>
            <div className='bg-gray-300 max-w-6xl  mx-auto w-full rounded-xl p-5'>
               <div className='flex justify-between'>
                  <div>
                     <h1 className='font-semibold text-2xl'>Meus filmes Favoritos</h1>
                     <h6 className='font-medium text-1xl'>Conheça a lista dos meus filmes favoritos.</h6>
                  </div>
                  <div className='flex items-center flex-col'>
                     <label htmlFor="order">Selecione a ordenação:</label>
                     <select 
                        name="order" 
                        id="order" 
                        className='h-[25px] px-3 rounded border-none outline-none ring-none'
                        onChange={e => setOrder(e.target.value)}
                     >
                        <option value="ano" key="ano">Ano de lançamento</option>
                        <option value="nome" key="nome">Nome</option>
                        <option value="pais" key="pais">País</option>
                     </select> 
                  </div>
               </div>
               
               <div className='grid grid-cols-4 gap-4'>
                  {  
                     films.map((movie, index) => (
                        <div className='bg-white rounded-md p-2' key={index.toString()}>
                           <div className='flex justify-end'>
                              <i className="bi bi-star-fill"></i>
                           </div>
                           
                           <div className='flex flex-col items-center justify-center'>
                              <img src={ movie.Poster } style={{height:80}}/>
                              <p className='text-sm text-center font-semibold'>{ movie.Title }</p>
                              <p className='text-xs text-center'>Diretor: { movie.Director }</p>
                              <p className='text-xs text-center'>País: { movie.Country }</p>
                              <p className='text-xs text-center'>Ano: { movie.Year }</p>
                           </div>
                        </div>
                     ))
                  } 
               </div>
            </div>
            
         </section>

         <footer className='bg-black flex h-[5%] items-center justify-center'>
            <h6 className="text-yellow-400 font-light text-sm">®️2022 Copyright - Hervesson Porto </h6>
         </footer>
      </div>
   );
}

export default App;
