import React from 'react'

function SelectedInput(props) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-0 flex gap-2 pl-[1.1rem] pointer-events-none items-center">
        <span className="flex text-gray-600">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 20 20"
            height={20}
            width={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d={props.d}
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span>
          <p className="text-gray-600 transition-all transfrom -translate-y-2 text-3xs">
            {props.name}
          </p>
        </span>
      </div>
      <select className="select pl-11 pt-3 w-full rounded-md focus:outline-none bg-gray-200/70 text-xs  font-bold ">
        <option selected />
        <option value="60c4e5c89676f6559c251f5d">Ariana</option>
        <option value="60c4e5c99676f6559c251f62">Ben Arous</option>
        <option value="60c4e5bc9676f6559c251f09">Bizerte</option>
        <option value="60c4e5bd9676f6559c251f0c">Béja</option>
        <option value="60c4e5c99676f6559c251f65">Gabès</option>
        <option value="60c4e5be9676f6559c251f13">Gafsa</option>
        <option value="60c4e5c19676f6559c251f2b">Jendouba</option>
        <option value="60c4e5c19676f6559c251f2e">Kairouan</option>
        <option value="60c4e5c29676f6559c251f35">Kasserine</option>
        <option value="60c4e5ce9676f6559c251f82">Kébili</option>
        <option value="60c4e5bf9676f6559c251f1b">La Manouba</option>
        <option value="60c4e5be9676f6559c251f18">Le Kef</option>
        <option value="60c4e5c39676f6559c251f3a">Mahdia</option>
        <option value="60c4e5c49676f6559c251f3f">Monastir</option>
        <option value="60c4e5bf9676f6559c251f1e">Médenine</option>
        <option value="60c4e5c09676f6559c251f21">Nabeul</option>
        <option value="60c4e5c49676f6559c251f42">Sfax</option>
        <option value="60c4e5dc9676f6559c251fe3">Sidi Bouzid</option>
        <option value="60c4e5c09676f6559c251f24">Siliana</option>
        <option value="60c4e5bc9676f6559c251f06">Sousse</option>
        <option value="60c4e5c69676f6559c251f4d">Tataouine</option>
        <option value="60c4e5d19676f6559c251f97">Tozeur</option>
        <option value="60c4e5d19676f6559c251f9a">Tunis</option>
        <option value="60c4e5c69676f6559c251f50">Zaghouan</option>
      </select>
    </div>
  );
}

export default SelectedInput