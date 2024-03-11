const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    recoveryEmail: String
    create: String
    rol: userRole
    password: String
    totalHours: Int
    salary: Int
    age: Int
    isActive: Boolean
    occupation: String
    assists: Boolean
    phone: Int
    gender: genderType
    grade: Grade
    subjects: [Subject]
    califications: Int
   annotations: [Annotation]
  }

  type Grade {
    id: ID
    name: String
    maxStudent: Int
    minStudent: Int
    seccion: Seccion
    headerTeacher: User
    students: [User]
    subjects: [Subject]
  }

  type Subject {
    id: ID
    name: String
    teacher: User
    students: [User]
    totalHours: Int
    califications: [User]
  }

  type Annotation {
    id: ID
    subject: Subject
    reason: String
    date: String
    description: String
    annotationType: annotationType
  }


  enum annotationType {
    POSITIVE
    NEGATIVE
    ASSITANCE
  }

  enum Seccion {
    A
    B
    C
    D
    E
  }

  enum userRole {
    ADMIN
    STUDENT
    TEACHER
    PRINCIPAL
    ASSISTANT
    COORDINATOR
  }

  enum genderType {
    MALE
    FEMALE
    ETC
    NONE
  }
 
  type Token {
    token: String
  }

  input UserInput {
    name: String!
    lastName: String!
    email: String
    password: String
    run: String!
    rol: userRole
    recoveryEmail: String!
    totalHours: Int
    salary: Int
    phone: String!
    age: Int
    isAcive: Boolean!
    gender: genderType
    occupation: String
    # TODO AGREGAR CALIFICACIONES, ASISTENCIA, ANOTACIONES, CURSOS, ASIGNATURAS
  }

  


  input AuthInput {
    email: String!
    password: String!
  }

  type Query {
    getToken: User
  }

  type Mutation {
    createAdmin(input: UserInput): User
    authUser(input: AuthInput): Token

    #Mantenedor usuarios
    createUser(input:  UserInput): User
    disableUser(id: ID): User
  }
`;

module.exports = typeDefs;