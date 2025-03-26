# Create base directories
mkdir -p src/{config,controllers,models,routes,sockets/{handlers,middleware},services,middleware,utils,types}
mkdir -p src/sockets/handlers

# Create main files
touch src/app.ts src/server.ts

# Create config files
touch src/config/{socket.ts,express.ts,index.ts}

# Create controllers
touch src/controllers/{authController.ts,userController.ts,chatController.ts}

# Create models
touch src/models/{User.ts,Message.ts,Room.ts}

# Create routes
touch src/routes/{authRoutes.ts,userRoutes.ts,chatRoutes.ts,index.ts}

# Create socket handlers and middleware
touch src/sockets/handlers/{chatHandler.ts,notificationHandler.ts,presenceHandler.ts}
touch src/sockets/middleware/{authMiddleware.ts,loggingMiddleware.ts}
touch src/sockets/index.ts

# Create services
touch src/services/{authService.ts,userService.ts,chatService.ts}

# Create middleware
touch src/middleware/{auth.ts,error.ts,validation.ts}

# Create utils
touch src/utils/{logger.ts,errors.ts}

# Create types
touch src/types/{socket.ts,models.ts}