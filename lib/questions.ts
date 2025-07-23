export type Question = {
  id: string;
  category: 'OS' | 'Networking' | 'DBMS';
  question: string;
  options: string[];
  answer: number; // index of correct option
};

export const questions: Question[] = [
  // OS
  {
    id: 'os1',
    category: 'OS',
    question: 'Which of the following is not a function of the operating system?',
    options: [
      'Memory management',
      'Processor management',
      'Virus protection',
      'Device management',
    ],
    answer: 2,
  },
  {
    id: 'os2',
    category: 'OS',
    question: 'Which scheduling algorithm is non-preemptive?',
    options: [
      'Round Robin',
      'First Come First Serve',
      'Shortest Remaining Time First',
      'Multilevel Queue',
    ],
    answer: 1,
  },
  {
    id: 'os3',
    category: 'OS',
    question: 'What is a critical section?',
    options: [
      'A part of program where shared resources are accessed',
      'A part of memory',
      'A type of file system',
      'A scheduling algorithm',
    ],
    answer: 0,
  },
  {
    id: 'os4',
    category: 'OS',
    question: 'Which of the following is a deadlock avoidance algorithm?',
    options: [
      'Banker’s algorithm',
      'FIFO',
      'LRU',
      'Optimal',
    ],
    answer: 0,
  },
  {
    id: 'os5',
    category: 'OS',
    question: 'Thrashing is:',
    options: [
      'A high paging activity',
      'A process state',
      'A scheduling algorithm',
      'A type of memory',
    ],
    answer: 0,
  },
  // Networking
  {
    id: 'net1',
    category: 'Networking',
    question: 'Which layer of the OSI model is responsible for routing?',
    options: [
      'Data Link',
      'Network',
      'Transport',
      'Session',
    ],
    answer: 1,
  },
  {
    id: 'net2',
    category: 'Networking',
    question: 'What does HTTP stand for?',
    options: [
      'HyperText Transfer Protocol',
      'HyperText Transmission Protocol',
      'HighText Transfer Protocol',
      'Hyper Transfer Text Protocol',
    ],
    answer: 0,
  },
  {
    id: 'net3',
    category: 'Networking',
    question: 'Which protocol is used to send email?',
    options: [
      'SMTP',
      'FTP',
      'SNMP',
      'HTTP',
    ],
    answer: 0,
  },
  {
    id: 'net4',
    category: 'Networking',
    question: 'What is the default port for HTTPS?',
    options: [
      '80',
      '21',
      '443',
      '25',
    ],
    answer: 2,
  },
  {
    id: 'net5',
    category: 'Networking',
    question: 'Which device operates at the Data Link layer?',
    options: [
      'Router',
      'Switch',
      'Hub',
      'Repeater',
    ],
    answer: 1,
  },
  // DBMS
  {
    id: 'dbms1',
    category: 'DBMS',
    question: 'Which of the following is not a type of database?',
    options: [
      'Hierarchical',
      'Network',
      'Relational',
      'Linear',
    ],
    answer: 3,
  },
  {
    id: 'dbms2',
    category: 'DBMS',
    question: 'What does SQL stand for?',
    options: [
      'Structured Query Language',
      'Simple Query Language',
      'Sequential Query Language',
      'Standard Query Language',
    ],
    answer: 0,
  },
  {
    id: 'dbms3',
    category: 'DBMS',
    question: 'Which command is used to remove all records from a table in SQL?',
    options: [
      'DELETE',
      'REMOVE',
      'DROP',
      'TRUNCATE',
    ],
    answer: 3,
  },
  {
    id: 'dbms4',
    category: 'DBMS',
    question: 'Which of the following is a DDL command?',
    options: [
      'INSERT',
      'UPDATE',
      'CREATE',
      'SELECT',
    ],
    answer: 2,
  },
  {
    id: 'dbms5',
    category: 'DBMS',
    question: 'A primary key:',
    options: [
      'Can be null',
      'Can have duplicate values',
      'Uniquely identifies a record',
      'Is not necessary',
    ],
    answer: 2,
  },
  // Add 15 more questions (5 per category) for a total of 30
  // ...
]; 