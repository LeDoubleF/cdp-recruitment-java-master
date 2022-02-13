package adeo.leroymerlin.cdp;

import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = false)
// readOnly = false to fixing issue 2
public interface EventRepository extends Repository<Event, Long> {

    void deleteById(Long eventId);

    List<Event> findAllBy();

	Event save(Event event);
    
}
