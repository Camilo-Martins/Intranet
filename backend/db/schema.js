const { gql } = require("apollo-server");

const typeDefs = gql`
  #ÍNDICE
  #TYPE'S
  #ENUMS'S
  #INPUT'S
  #TYPE'S QUERY
  #TYPE'S MUTATION

  type Token {
    token: String
  }

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
    grade: ID
    subjects: [Subject]
    califications: Int
   annotations: [Annotation]
  }

  type Grade {
    id: ID
    name: gradeLvl
    maxStudent: Int
    minStudent: Int
    studentsQuantity: Int
    seccion: seccion
    fullName: String
    headerTeacher: ID
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

  type GradeInfo{
    gradeName: String
    studentsQuantity: Int
  }

  enum annotationType {
    POSITIVE
    NEGATIVE
    ASSITANCE
  }

  #Hacer que sea dinámico
  enum gradeLvl {
    PRIMERO
    SEGUNDO
    TERCERO
    CUARTO
    PRIMERO_MEDIO

  }

  enum subjectName{
    MATEMATICA
    MUSICA
    HISTORIA
    FISICA
    QUIMICA
  }

  #Hacer que sea dinámico
  enum seccion {
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

  input GradeInput {
    name: gradeLvl!
    fullName: String
    maxStudent: Int!
    minStudent: Int!
    seccion: seccion!
    headerTeacher: ID!
    subjects: [ID]
    studentsQuantity: Int
  }

  input AssingStudentInput{
    students: [ID]
  }

  input AssingSubjects{
    subject: ID!
    name: String
    teacher: ID!
    students: [ID]!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  input SubjectIput{
    name: String!
    teacher: ID
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

    #Mantenedor de cursos
    createGrade(input: GradeInput): Grade
    assingStudents(id: ID!, input: AssingStudentInput): Grade

    #Mantenedor asignaturas
    createSubject(id: ID!, input: SubjectIput): Grade
    unassingSubject(id: ID!, idSubject: ID!): Grade
    assingSubjectStudents(id: ID!, input: AssingStudentInput): Subject

  }
`;

module.exports = typeDefs;