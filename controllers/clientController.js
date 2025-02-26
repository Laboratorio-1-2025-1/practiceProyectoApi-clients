// controllers/clientController.js
// Hacemos primero un arreglo en la memoria para los clientes

let clients = [];
let nextId = 1;
const regexMail = /\w+\@\w+\.\w/g;
const mailExample = 'example@mail.com';

// GET /api/clients -> Obtener todos los clientes 
exports.getAllClients = (req, res) => {
    res.json(clients);
};

// GET /api/clients/:id -> Obtener un cliente por su id

exports.getClientById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const client = clients.find(cliente => cliente.id === id);
    if (!client) {
        return res.status(404).json({ message: 'Cliente no encontrado'});
    }
    res.json(client);
};

// Check campos validos de entrada
//function checkEntry() {
//    return true;
//};
// POST /api/clients -> Crear un nuevo cliente

exports.createClient = (req, res) => {
    const { name, lastName, mail, phone } = req.body;
    if (!name || !lastName || !mail || phone == null) {
        return res.status(400).json({ message: 'Hay algun dato faltante, por favor verificar'});
    };
    if (mail.match(regexMail) == null) {
        return res.status(400).json({ message: 'Por favor use un formato de correo valido: '+mailExample })
    };
    const newClient = {
        id: nextId++,
        name,
        lastName,
        mail,
        phone
    };
    clients.push(newClient);
    res.status(201).json(newClient);
};

// PUT /api/clients/:id -> Actualizar un cliente

exports.updateClient = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, lastName, mail, phone } = req.body;
    const client = clients.find(cliente => cliente.id === id);
    if (!client) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    if (name !== undefined) client.name = name;
    if (lastName !== undefined) client.lastName = lastName;
    if (mail !== undefined || mail.match(regexMail) !== null) client.mail = mail;
    if (phone !== undefined) mail.phone = phone;
    res.json(client);
};

// DELETE /api/clients/:id -> Eliminar un cliente

exports.deleteClient = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = clients.findIndex(cliente => cliente.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Cliente no encontrado'});
    }
    const deletedClient = clients.splice(index, 1);
    res.json({ message : 'Cliente eliminado', client: deletedClient[0] });
};