const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    create: String
    rol: userRole
    password: String
  }

  type Director {
    id: ID
    name: String
    lastName: String
    email: String
    emailRecovery: String
    create: String
    rol: userRole
    totalHours: Int
    salary: Int
    age: Int
    isActive: Boolean
    occupation: String
    assists: Boolean
    password: String
  }

  type Coordinator {
    id: ID
    name: String
    lastName: String
    email: String
    emailRecovery: String
    create: String
    rol: userRole
    totalHours: Int
    salary: Int
    password: String
    phone: Int
    age: Int
    isActive: Boolean
    gender: genderType
    occupation: String
  }

  type Teacher {
    id: ID
    name: String
    lastName: String
    email: String
    emailRecovery: String
    create: String
    rol: userRole
    totalHours: Int
    salary: Int
    password: String
    phone: String
    age: Int
    isAcive: Boolean
    gender: genderType
    grade: Grade
    subjects: [Subject]
    occupation: String
    assists: Boolean
  }

  type Student {
    id: ID
    name: String
    lastName: String
    email: String
    emailRecovery: String
    create: String
    rol: userRole
    password: String
    phone: String
    age: Int
    isAcive: Boolean
    grade: Grade
    assists: Boolean
    califications: Int
    gender: genderType
    subjects: [Subject]
    annotations: [Annotation]
  }

  type Grade {
    id: ID
    name: String
    maxStudent: Int
    minStudent: Int
    seccion: Seccion
    headerTeacher: Teacher
    students: [Student]
    subjects: [Subject]
  }

  type Subject {
    id: ID
    name: String
    teacher: Teacher
    students: [Student]
    totalHours: Int
    califications: [Student]
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

  input AdminInput {
    name: String!
    lastName: String!
    email: String!
    password: String!
    run: String!
    rol: userRole
  }

  input DirectorInput{
    name: String!
    lastName: String!
    password: String
    emailRecovery: String!
    run: String!
    rol: userRole!
    totalHours: Int!
    salary: Int
    phone: String!
    age: Int!
    isAcive: Boolean!
    gender: genderType!
    occupation: String!
  }

  input CoordinatorInput{
    name: String!
    lastName: String!
    password: String
    emailRecovery: String!
    run: String!
    rol: userRole!
    totalHours: Int!
    salary: Int
    phone: String!
    age: Int!
    isAcive: Boolean!
    gender: genderType!
    occupation: String!
  }

  input TeacherInput{
    name: String!
    lastName: String!
    password: String
    emailRecovery: String!
    run: String!
    rol: userRole!
    totalHours: Int!
    salary: Int
    phone: String!
    age: Int!
    isAcive: Boolean!
    gender: genderType!
    occupation: String!
  }

  input StudentInput{
    name: String!
    lastName: String!
    password: String
    emailRecovery: String!
    run: String!
    rol: userRole!
    phone: String!
    age: Int!
    isAcive: Boolean!
    gender: genderType!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  type Query {
    getToken: User
  }

  type Mutation {
    createAdmin(input: AdminInput): User
    authUser(input: AuthInput): Token

    #Mantenedor usuarios
    createDirector(input: DirectorInput): Director
    createCoordinator(input: CoordinatorInput): Coordinator
    createTeacher(input: TeacherInput): Teacher
    createStudent(input: StudentInput): Student

  }
`;

module.exports = typeDefs;
