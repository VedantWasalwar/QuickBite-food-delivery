"""
Custom middleware for better error handling and logging
"""
import traceback
import logging
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger(__name__)


class ErrorHandlingMiddleware:
    """
    Middleware to catch and handle exceptions globally
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
            return response
        except Exception as e:
            # Log the full error
            logger.error(f"Unhandled exception: {str(e)}")
            logger.error(traceback.format_exc())
            
            # Return JSON error response
            return JsonResponse({
                'error': 'Internal server error',
                'detail': str(e),
                'path': request.path,
            }, status=500)




