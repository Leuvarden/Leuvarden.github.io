package fileserving;

/*
 * Setup a simple undertow web server to server static content and supporting:
 * - content compression
 * - caching - duration must be at least one week to make PageSpeed Insights happy
 *
 * Example from
 * https://github.com/undertow-io/undertow/blob/master/examples/src/main/java/io/undertow/examples/fileserving/FileServer.java
 *
 * to retreive own ip address accessable by PageSpeed Insights by http://whatismyipaddress.com/
 * It returns 188.60.250.55
 *
 * Use  http://188.60.250.55:8778/index.html for https://developers.google.com/speed/pagespeed/insights/?hl=en
 *
 * http://178.197.224.130:8778/index.html
 *
 *
 * https://developers.google.com/speed/pagespeed/insights/?hl=en&url=http://188.60.34.5:8778/index.html
 *
 *
 */

import io.undertow.Undertow;
import io.undertow.io.IoCallback;
import io.undertow.predicate.Predicate;
import io.undertow.predicate.Predicates;
import io.undertow.server.HttpHandler;
import io.undertow.server.HttpServerExchange;
import io.undertow.server.handlers.RequestDumpingHandler;
import io.undertow.server.handlers.encoding.*;
import io.undertow.server.handlers.resource.CachingResourceManager;
import io.undertow.server.handlers.resource.FileResourceManager;
import io.undertow.server.handlers.resource.ResourceHandler;
import io.undertow.util.Headers;
import io.undertow.util.StatusCodes;

import java.io.File;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;

import static io.undertow.Handlers.resource;

public class StaticHttpServer {

    public static final String LOCAL_PATH
            = "../dist";
    public static final String LOCAL_PATH_ORIG
        = "/home/armin/ws/Udacity_Nanodegree_FrontendDeveloper/P4-frontend-nanodegree-mobile-portfolio-orig";

    private static Map<String, String> pathCache = new TreeMap<>();


    public static void main(final String[] args) {

        /**
         * Server for original pages under ./
         */

        Undertow originalServer = Undertow.builder()
                                  .addHttpListener(8777, "localhost")
                                  .setHandler(resource(new FileResourceManager(new File(LOCAL_PATH_ORIG), 100))
                                                      .setDirectoryListingEnabled(true))
                                  .build();
        originalServer.start();

        /**
         * Server for the optimized page under /dist/
         */
        File resourcesRoot = new File(LOCAL_PATH);
        FileResourceManager resourceManager = new FileResourceManager(resourcesRoot, 10485760);
        CachingResourceManager cachingResourceManager = new CachingResourceManager(100, 10000, null, resourceManager, -1);


        /**
         * Enable content encoding (compression)
         */
        ContentEncodingRepository contentEncodingRepository =
                new ContentEncodingRepository().addEncodingHandler("gzip", new GzipEncodingProvider(), 50,
                                                                      Predicates.truePredicate()    /*Predicates.parse("max-content-size[5]")*/);

        int minResourceSize = 0;
        int maxResourceSize = 100000;
        Predicate encodingAllowed = Predicates.truePredicate();

        ContentEncodedResourceManager contentEncodedResourceManager
                = new ContentEncodedResourceManager(resourcesRoot, cachingResourceManager, contentEncodingRepository,
                                                           minResourceSize, maxResourceSize, encodingAllowed);

        /**
         * Enable caching of 8 days
         */
        ResourceHandler resourceHandler = new ResourceHandler(resourceManager)
                                                  .setDirectoryListingEnabled(true)
                                                  .setCachable(Predicates.truePredicate())
                                                  .setCacheTime(8 * 24 * 60 * 60);
        resourceHandler.setContentEncodedResourceManager(contentEncodedResourceManager);

        /**
         * To dump header use this request handler.
         */
        RequestDumpingHandler requestDumpingHandler = new RequestDumpingHandler(resourceHandler);

        Undertow optimizedServer = Undertow.builder()
                                  .addHttpListener(8778, "0.0.0.0")
                                  .setHandler(resourceHandler)
                                  // .setHandler(requestDumpingHandler)
                                  .build();
        optimizedServer.start();
    }
 }
