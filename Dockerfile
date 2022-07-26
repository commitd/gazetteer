FROM eclipse-temurin:17_35-jdk as builder
ARG JAR_FILE
WORKDIR /application
COPY ${JAR_FILE} app.jar
RUN java -Djarmode=layertools -jar app.jar extract

FROM eclipse-temurin:17_35-jdk
RUN mkdir /data
VOLUME /data
WORKDIR /application
COPY --from=builder application/dependencies ./
COPY --from=builder application/spring-boot-loader ./
COPY --from=builder application/snapshot-dependencies ./
COPY --from=builder application/application ./
ENTRYPOINT ["java", "-Dspring.profiles.active=${PROFILES:-}", "-Dlogging.level.io.committed=${COMMITTED_LOG_LEVEL:-INFO}", "-Djava.security.egd=file:/dev/./urandom", "org.springframework.boot.loader.JarLauncher"]