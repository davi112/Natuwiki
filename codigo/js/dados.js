listaPessoas = [
    {
        "id": 1,
        "nome": "Admin",
        "sobrenome": "Natuwiki",
        "cidade": "Belo Horizonte",
        "celular": "31997270845",
        "email": "admin@natuwiki",
        "casado": false,
        "filhos": 0,
        "experiencia_natureza": "baixo",
        "destinos_favoritos": ["Cachoeira", "Camping"],
        "transporte": ["Transporte Público", "Bicicleta"],
        "usuario": {
            "senha": "1234",
            "login": "admin"
        }
    },
    {
        "id": 2,
        "nome": "Juliana",
        "sobrenome": "Alves",
        "cidade": "Belo Horizonte",
        "celular": "31978675677",
        "email": "julianalves@gmail.com",
        "casado": false,
        "filhos": 1,
        "experiencia_natureza": "baixo",
        "destinos_favoritos": ["Esportes radicais", "Trilha"],
        "transporte": ["Carro"],
        "usuario": {
            "senha": "12345",
            "login": "julianalves@gmail.com"
        }
    }
    , {
        "id": 3,
        "nome": "Carlos",
        "sobrenome": "Silva",
        "cidade": "São Paulo",
        "celular": "11987654321",
        "email": "carlos.silva@outlook.com",
        "casado": true,
        "filhos": 2,
        "experiencia_natureza": "médio",
        "destinos_favoritos": ["Camping", "Trilha"],
        "transporte": ["Moto", "Carro"],
        "usuario": {
            "senha": "12345",
            "login": "carlos.silva@outlook.com"
        }
    },
    {
        "id": 4,
        "nome": "Ana",
        "sobrenome": "Gomes",
        "cidade": "Rio de Janeiro",
        "celular": "21976543210",
        "email": "ana.gomes@gmail.com",
        "casado": false,
        "filhos": 0,
        "experiencia_natureza": "alto",
        "destinos_favoritos": ["Cachoeira", "Camping"],
        "transporte": ["Transporte Público"],
        "usuario": {
            "senha": "12345",
            "login": "ana.gomes@gmail.com"
        }
    },
    {
        "id": 5,
        "nome": "Mariana",
        "sobrenome": "Santos",
        "cidade": "Belo Horizonte",
        "celular": "31987654321",
        "email": "mariana.santos@gmail.com",
        "casado": false,
        "filhos": 0,
        "experiencia_natureza": "alto",
        "destinos_favoritos": ["Trilha", "Esportes radicais"],
        "transporte": ["Carro"],
        "usuario": {
            "senha": "12345",
            "login": "mariana.santos@gmail.com"
        }

    }
];

if(localStorage.getItem('pessoas') == null)
    localStorage.setItem('pessoas', JSON.stringify(listaPessoas))