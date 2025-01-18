# Vite Web3 App

This repository contains a Vite-powered web application that integrates with Web3 technologies. The project is set up using React and Vite, providing a fast and modern development experience.

## Project Structure

The project consists of two main parts:
1. **Client**: The frontend part of the application built with React and Vite.
2. **Blockchain**: The backend part which interacts with blockchain smart contracts.

### Client

The client directory contains a minimal setup to get React working in Vite with Hot Module Replacement (HMR) and some ESLint rules. It includes the following plugins:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Uses [SWC](https://swc.rs/) for Fast Refresh.

### Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/mg77-cpu/vite-web3-app.git
    cd vite-web3-app
    ```

2. **Install dependencies**:
    Navigate to the `client` directory and install the required packages.
    ```sh
    cd client
    npm install
    ```

3. **Run the development server**:
    Start the Vite development server to run the client application.
    ```sh
    npm run dev
    ```

4. **Open the application**:
    Open your browser and navigate to `http://localhost:3000` to see the application in action.

### Building for Production

To build the project for production, use the following command:
```sh
npm run build

** Contributing **

 Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or create a pull request.

** License **

This project is licensed under the MIT License. See the LICENSE file for more details.