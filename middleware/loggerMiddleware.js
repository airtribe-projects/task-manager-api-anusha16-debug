const loggerMiddleware = (req, res, next) => {
    // Capture the start time
    const startTime = Date.now();
    
    // Get request details
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl || req.url;
    const ip = req.ip || req.connection.remoteAddress;
    
    // Log the incoming request
    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
    
    // Capture the original end function
    const originalEnd = res.end;
    
    // Override res.end to log response details
    res.end = function(chunk, encoding) {
        // Calculate response time
        const responseTime = Date.now() - startTime;
        
        // Get status code
        const statusCode = res.statusCode;
        
        // Log the response
        console.log(`[${timestamp}] ${method} ${url} - Status: ${statusCode} - ${responseTime}ms`);
        
        // Call the original end function
        originalEnd.call(this, chunk, encoding);
    };
    
    // Continue to the next middleware
    next();
};

module.exports = loggerMiddleware;