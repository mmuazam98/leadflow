import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - [%(levelname)s] - %(message)s",
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ],
)

# Create a logger instance
logger = logging.getLogger("app_logger")


def log_message(level: str, message: str):
    """Log messages at different levels (info, error, debug, warning)."""
    level = level.lower()
    if level == "info":
        logger.info(message)
    elif level == "error":
        logger.error(message)
    elif level == "debug":
        logger.debug(message)
    elif level == "warning":
        logger.warning(message)
    else:
        logger.info(message)  # Default to INFO
